# Episode 01 — On Wednesdays We Do AI · paired production master

Status: PRODUCER REPAIR. This master owns the full candidate Written edition and tagged Narration below. The approved canonical baseline is unchanged. No new recording, content admission or publication is claimed.

Keep the episode's authored voice and the Read layout. Edit common literal wording in the shared values under Export settings; edit deliberately different reading/spoken passages in their respective sections here, then export both together. Exporting preserves markup and performance cues; it does not judge facts or invent a spoken adaptation. The written edition and narration outputs are derivatives, not competing masters.

Patron Saint: Dolly Parton — Common Sense. Her bridge encouragement leads into starting with a useful real task; her teaching job is retaining human judgment and consequences. Episodes 1–3 together govern voice and Rewind reference density.

## Export settings
```json
{
  "episode": 1,
  "status": "PRODUCER_REPAIR",
  "shared": {
    "title": "On Wednesdays We Do AI",
    "dolly_bridge": "building your own bridge"
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
<title>Episode 01 · {{EP:title}} · LAiDIES · SUNNYVAiLE</title>
<meta name="description" content="The pilot. She stops waiting for a free weekend, tells AI the truth about one dreaded email, and finds out the gender gap was never a confidence problem — it's a physics problem. Get in loser, we're learning AI.">
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
    background:linear-gradient(180deg,rgba(14,9,24,.46) 0%,rgba(11,7,18,.72) 66%,rgba(11,7,18,.94) 100%), url('../assets/episodes/ep-01/pixel/ep01-scene-01-steve-ovation.jpg') center 30%/cover}
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

  /* Maven identity card (small credit beneath the scene film) */
  .idcard{max-width:var(--measure);margin:16px auto 0;display:flex;align-items:center;gap:16px}
  .idcard>img{width:66px;height:99px;object-fit:cover;border-radius:8px;border:1px solid rgba(201,162,39,.5);flex:none;box-shadow:0 12px 26px -14px rgba(58,24,56,.6)}
  .idmeta{display:flex;flex-direction:column;gap:4px;align-items:flex-start}
  .idmeta b{font-weight:800;font-size:1.18rem;color:#fff;letter-spacing:-.01em;line-height:1.05}
  .idmeta .idrole{font-family:'VT323',monospace;font-size:1.02rem;color:#c3b2d8;letter-spacing:.03em}

  /* Maven scene: film (full width) + inset identity card */
  .scene{max-width:var(--wide);margin:48px auto 0}
  /* Maven era/role kicker — a quiet LABEL, not a button (no pill, no play arrow) */
  .cue{display:inline-block;font-family:'VT323',monospace;font-size:1.08rem;letter-spacing:.11em;text-transform:uppercase;color:#7be0d0;background:none;padding:0}
  .cue.c-pink{color:var(--pink)} .cue.c-tang{color:var(--tang)} .cue.c-sky{color:var(--sky)} .cue.c-coral{color:var(--coral)} .cue.c-peri{color:var(--peri)}
  .cue .play{display:none}
  .portrait{max-width:340px;margin:20px auto 6px}
  .portrait img{width:100%;display:block;border-radius:10px;border:1px solid rgba(201,162,39,.45);box-shadow:0 22px 46px -22px rgba(58,24,56,.6)}
  .portrait figcaption{margin-top:10px;text-align:center;font-family:'VT323',monospace;font-size:1.05rem;letter-spacing:.04em;color:var(--plum-soft,#6b3a66)}
  .portrait figcaption b{display:block;font-family:'Jost',sans-serif;font-weight:800;font-size:1.15rem;letter-spacing:-.01em;color:var(--plum-deep)}

  /* Pull quote */
  .pull{max-width:var(--measure);margin:52px auto;padding:24px 22px;text-align:center}
  .pull p{font-style:italic;font-size:clamp(1.5rem,3.4vw,2rem);line-height:1.3;color:#fff;margin:0;max-width:none;font-weight:600;text-shadow:0 0 34px rgba(233,130,171,.28)}
  .pull .who{margin-top:12px;font-family:'VT323',monospace;font-size:1.05rem;letter-spacing:.08em;color:#7be0d0}

  /* Receipts / stat */
  .receipt{max-width:var(--measure);margin:44px auto;background:#0c1a1e;color:#d6eff1;border:1.5px solid #57b6c0;border-radius:12px;padding:22px 24px;box-shadow:0 0 40px -14px rgba(87,182,192,.5) inset}
  .receipt .h{font-family:'VT323',monospace;font-size:1.05rem;letter-spacing:.1em;text-transform:uppercase;color:#7be0d0;margin-bottom:10px}
  .receipt .row{display:flex;gap:20px;align-items:center}
  .receipt .num{font-size:2.8rem;font-weight:800;color:#f4a636;line-height:1;flex:none;font-family:'VT323',monospace}
  .receipt .txt{font-size:1rem;line-height:1.5;color:#d6eff1}
  .receipt .src{display:block;margin-top:12px;font-size:.86rem;color:#8fb3b8;line-height:1.45}

  /* Trio */
  .trio{max-width:var(--wide);margin:26px auto;display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
  .trio figure{margin:0}
  .trio img{width:100%;border-radius:10px;border:1px solid rgba(201,162,39,.45);box-shadow:0 16px 34px -18px rgba(58,24,56,.6)}
  .trio figcaption{margin-top:9px;text-align:center;font-family:'VT323',monospace;font-size:.98rem;color:#c3b2d8}

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

  /* Study pack — expandable "three words, defined" */
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

  @media(max-width:640px){
    body{font-size:16.5px}
    .tv-title{font-size:2.5rem}
    .trio{grid-template-columns:1fr}
    .cast-grid{grid-template-columns:repeat(2,1fr)}
    .spine-inner .end{display:none}
    .receipt .row{align-items:flex-start;flex-direction:column}
    .receipt .num{font-size:2.25rem}
  }
</style>
  <link rel="stylesheet" href="/content/episode-format-navigation.css?v=20260803-1">
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
  <link rel="canonical" href="https://laidies.ai/issues/issue-01" />
  <meta property="og:url" content="https://laidies.ai/issues/issue-01" />
</head>
<body>

<!-- Canonical town header (sv-global-header.js rewrites this in place) -->
<header class="sv-header"></header>

<nav class="episode-format-nav" aria-label="Choose Episode 01 format">
  <a class="episode-format-nav__choice" href="/issues/issue-01.html" aria-current="page"><span>Read</span><small>Full written episode</small></a>
  <a class="episode-format-nav__choice" href="/watch.html?ep=01&amp;mode=listen"><span>Listen</span><small>Narration + captions</small></a>
  <span class="episode-format-nav__choice" aria-disabled="true"><span>Watch</span><small>Not available yet</small></span>
  <p class="episode-format-nav__status">You’re reading Episode 01. Visual edition not admitted yet.</p>
</nav>

<!-- CINEMATIC PIXEL HERO — the tape, paused on its opening frame -->
<header class="tv-hero">
  <div class="osd"><span>❚❚ SP</span><span>S1 · E01</span></div>
  <p class="tv-meta">SEASON 1 · EPISODE 01 · READING EDITION</p>
  <h1 class="tv-title">ON WEDNESDAYS WE <em>DO Ai</em></h1>
  <p class="tv-logline">The one where she stops waiting for a free weekend, tells AI the truth about one dreaded email, and finds out the gap was never confidence — it was physics.</p>
  <div class="tv-tags"><span>LESSON · <b>What AI is + why start</b></span><span>PATRON SAINT · <b>Dolly · Common Sense</b></span><span><b>~10 MIN READ</b></span></div>
</header>

<div class="spine"><div class="spine-inner">READING EDITION <span class="dot">·</span> S1 E01 <span class="dot">·</span> ~10 MIN <span class="end">KEEP YOUR PLACE</span></div></div>

<main>

  <div class="prev">
    <p class="eyebrow">▶ New here? Start on a Wednesday</p>
    <p>This is the pilot — no previous episode to recap, just the part where she stops waiting for a free weekend. A 24-episode season, one new Episode every Wednesday, each skill building on the last. By the finale you'll have built your own squad of AI employees, each named for a woman from our favourite era. Get in loser, we're learning AI — one Wednesday at a time.</p>
  </div>

  <div class="mark"><div class="k">I couldn't help but wonder…</div></div>
  <figure class="film" aria-label="Steve receives a standing ovation while her better draft remains unfinished">
    <div class="frames" data-frames="ep01-scene-01-steve-ovation.png"><img src="../assets/episodes/ep-01/pixel/ep01-title-card-comic-v2.png" alt="" loading="lazy"></div>
    <figcaption class="film-cap">4:52 on a Tuesday. Steve gets the standing ovation. Her better, footnoted version is still in drafts.</figcaption>
  </figure>
  <p class="lead">…why every AI resource I found was either written by men in fleece vests (say no more), or so surface-level it basically amounted to "AI is transformative!" AI is transformative? <em>Groundbreaking.</em></p>
    <figure class="film" aria-label="The office applauds Steve while she tries to understand what changed">
      <div class="frames"><img src="../assets/episodes/ep-01/pixel/delivery-20260719-master-v1/ep01-steve-ovation-c-end-comic-textfix.png" alt="" loading="lazy"></div>
      <figcaption class="film-cap">Everyone stood up. She was still trying to work out what it did.</figcaption>
    </figure>

  <p>It's 4:52 on a Tuesday and a man named Steve just got called a visionary for a clean, confident analysis everyone in the room knows took him about an hour. Your version had footnotes and two weekends behind it — and it's still in your drafts, waiting to feel "ready." He isn't smarter. He just stopped doing it the hard way. <em>When did everyone learn to do that? And when, exactly, was I supposed to?</em></p>
  <p>I have a full-time job, a team to manage, and a calendar that's perpetually a Tetris game I'm losing. Adding "become AI-literate" to that pile felt about as realistic as Miranda Priestly asking me to fetch the unpublished Harry Potter manuscript. <strong>Technically possible — but at what personal cost?</strong></p>
  <p>So I did what every competent woman does with a problem she has no time for: I put it on a list. For six months. Then one night, at eleven, I went looking again.</p>

  <div class="mark"><div class="k">The on-ramp</div><h2>Written by Men in Fleece Vests</h2><div class="sub">Too technical, too shallow, or too many hours — none of it written for a woman already carrying too much.</div></div>
  <figure class="film" aria-label="An inaccessible AI learning on-ramp built for someone else">
    <div class="frames" data-frames="ep01-scene-02-on-ramp.png"><img src="../assets/episodes/ep-01/pixel/ep01-02-scene-comic-v1.png" alt="" loading="lazy"></div>
    <figcaption class="film-cap">Everything on the on-ramp was written for someone who wasn't you.</figcaption>
  </figure>
  <p>I found <strong>L<span class="ai">Ai</span>DIES</strong> after too many explanations written for people who wanted to build models, not use them; listicles with all the nutritional value of a rice cake; and 40-hour courses marketed to people who apparently don't have jobs, children, or a standing Thursday happy hour with friends. Somewhere past the third search result, there was a little internet town called SUNNYVAiLE. A main street, a radio station and a LIBRAiRY that never closes. I didn't know it yet, but I was moving in.</p>
  <p>One episode every Wednesday, for women who are already competent, already busy, and want an explanation that connects to life outside theoretical computer science. Think of Elle Woods arriving at Harvard Law: underestimated, willing to learn, and bringing experience the room had not thought to value. <strong>If any of that sounds familiar: get in loser, we're learning AI.</strong></p>

  <div class="mark"><div class="k">The gap</div><h2>It's Not a Confidence Problem. It's a Physics Problem.</h2></div>
  <figure class="film" aria-label="The invisible workload widening an AI access gap into a canyon">
    <div class="frames" data-frames="ep01-scene-03-canyon.png"><img src="../assets/episodes/ep-01/pixel/delivery-20260719-master-v1/ep01-canyon-montage-comic.png" alt="" loading="lazy"></div>
    <figcaption class="film-cap">A gap you don't close compounds week over week — into a canyon.</figcaption>
  </figure>
  <p class="lead">The commentary loves to blame confidence and imposter syndrome. That's not what I experienced, and it's not what I hear from the women I talk to. What I hear is: I'm already drowning, I have no idea where to start, and even if I did — when exactly am I supposed to do this?</p>
  <p>You cannot add hours to a day that's already over-subscribed. And women in corporate roles are already carrying more context, more logistics, more emotional labor, more "office housework" than their male peers. You know how there's always one person who preps the deck, remembers last time's feedback, follows up on the action items nobody else tracked, and still delivers her own work on time? That person is <em>usually not named Steve.</em></p>
  <div class="receipt">
    <div class="h">The physics of it</div>
    <div class="row"><span class="num">47.8% : 39.3%</span><span class="txt">Estimated generative-AI adoption among men and women in the sources that reported use by gender — a 22% relative gap. The paper reports that the gap narrowed over time but stabilized near 16% from early 2025.</span></div>
    <span class="src">Cranney, Delecourt &amp; Koning, HBS Working Paper 25-023, May 2026 · 76 sources · 100+ countries · 318,924 respondents in the gender-use-rate sample. Working-paper estimates vary by source, place, occupation and time.</span>
  </div>
  <p>Lean In's 2026 survey of US adults gets into the uncomfortable specifics: men are about <strong>23%</strong> more likely to be encouraged by managers to use AI. Among people who have used AI at work, men are about <strong>27%</strong> more likely to be praised for it. And women are about <strong>32%</strong> more likely to worry that using AI looks like cutting corners. That last one hit like Samantha Jones delivering a hard truth over brunch. <strong>It's not imposter syndrome. It's pattern recognition.</strong> (Ironic, given what AI actually is — but we'll get there.)</p>
  <p>And here's the cruel part: the tool that could give you time back requires time you don't have to learn. So you don't start. The gap compounds week over week. And a year from now the distance between you and the colleague who started six months ago isn't a gap. It's a canyon.</p>

  <div class="mark"><div class="k">Build your own bridge</div><h2>Dolly Was Right</h2></div>
  <figure class="film" aria-label="Dolly Parton energy for {{EP:dolly_bridge}} into AI">
    <div class="frames" data-frames="ep01-scene-04-dolly-bridge.png"><img src="../assets/episodes/ep-01/pixel/delivery-20260719-master-v1/ep01-dolly-parton-comic.png" alt="" loading="lazy"></div>
    <figcaption class="film-cap">Nobody's coming to build it for you. So — honey — build it.</figcaption>
  </figure>
  <blockquote class="pull"><p>"You'd better get to {{EP:dolly_bridge}}, honey — because ain't nobody building it for you."</p><div class="who">Dolly Parton energy</div></blockquote>
  <p>This isn't about becoming technical. It's about not leaving a genuinely useful tool sitting unopened on your desk while everyone else figures out what it can do. The bridge is yours to build — and the good news is you can start with one plank: a task small enough to try, familiar enough that you can judge whether the result actually helps.</p>

  <div class="mark"><div class="k">The stakes</div><h2>A Future Built by Half the Population</h2></div>
  <figure class="film" aria-label="Fei-Fei Li and the need for women to shape AI's future">
    <div class="frames" data-portrait-art="held"></div>
    <figcaption class="film-cap">Fei-Fei Li co-founded AI4ALL to widen participation in AI education.</figcaption>
  </figure>
  <p>Fei-Fei Li, the Stanford computer scientist, co-founded AI4ALL to widen participation in AI education. That gave the question I brought to the LIBRAiRY a bigger frame: who gets to help shape this technology?</p>
  <p>People who use these tools can notice whose needs they miss, challenge poor results and ask for something better. Using a chatbot does not automatically retrain its model. But being able to question the technology matters—in the meeting where it is bought, the task where it is used, and the decision to stop when it gets something wrong.</p>

  <div class="mark"><div class="k">The flip</div><h2>The Gap Is a Starting Line, Not a Finish Line</h2></div>
  <figure class="film" aria-label="The AI gap reframed as a starting line instead of a finish line">
    <div class="frames" data-frames="ep01-scene-06-the-flip.png"><img src="../assets/episodes/ep-01/pixel/delivery-20260719-master-v1/ep01-the-flip-14pts-c-end-comic.png" alt="" loading="lazy"></div>
    <figcaption class="film-cap">An overall participation gap does not describe every group.</figcaption>
  </figure>
  <p><strong>Wait—didn't we just say women use AI <em>less</em>?</strong> On average, yes. But an average can hide a different pattern in a particular group. In BCG's 2024 survey of tech-company employees, senior women in technical functions reported higher adoption than men in those same roles.</p>
  <div class="receipt">
    <div class="h">The flip</div>
    <div class="row"><span class="num">+14 pts</span><span class="txt">In BCG's 2024 survey, senior women in technical functions led their male peers in reported GenAI <em>adoption</em> by 14 percentage points.</span></div>
    <span class="src">BCG, "Women Leaders Are Paving the Way in GenAI" (2024) — 6,500+ tech employees, five countries. Note: this is an adoption lead (share who use it), not a claim that women are "better at AI."</span>
  </div>
  <p>So the overall gap is not the whole story. In that group, women were already ahead on using the tools. And you bring something useful already: <strong>a career's worth of judgment.</strong> The instinct that something is off in a document before you can even articulate why.</p>

  <div class="mark"><div class="k">The first win</div><h2>Oh. I Can Do This.</h2></div>
  <figure class="film" aria-label="Her first small AI win at the Blend and Snap">
    <div class="frames" data-frames="ep01-scene-07-first-win.png"><img src="../assets/episodes/ep-01/pixel/delivery-20260719-master-v1/ep01-blend-snap-win-c-end-comic-v4-style-fix-textfix.png" alt="" loading="lazy"></div>
    <figcaption class="film-cap">Four days of dread. Eleven minutes of work.</figcaption>
  </figure>
  <p>Here's what it looked like when I started. A Sunday at the Blend &amp; Snap. There was an email I had dreaded for four days—the delicate one, to the stakeholder who reads tone into line breaks. I described the situation without pasting the correspondence or naming anyone: what the message needed to achieve, the tone I wanted and what it must not promise. For work, the tool and the information have to be allowed by your employer. A personal subscription does not settle that.</p>
  <p>A draft comes back in nine seconds. It's 80% right — and the other 20% is wrong in ways only you can see. So you fix it with your own judgment and hit send. Four days of dread, eleven minutes of work. The work didn't get worse. It got done faster, and the time you got back is yours. That's the whole reframe: the thing stopping you was never ability. It was that nobody had made you want to start.</p>

  <div class="mark"><div class="k">The explainer</div><h2>The Most Talented New Hire You'll Ever Manage</h2><div class="sub">What you'd say if someone asked "so what IS AI?" over drinks.</div></div>
  <figure class="film" aria-label="AI explained as a talented new hire who still needs management">
    <div class="frames" data-frames="ep01-scene-08-new-hire.png"><img src="../assets/episodes/ep-01/pixel/delivery-20260721-autonomous-rerolls/ep01-new-hire-comic-v5-fix.png" alt="" loading="lazy"></div>
    <figcaption class="film-cap">Superhuman range. Astonishing speed. Zero lived judgment.</figcaption>
  </figure>
  <p>Imagine someone who has absorbed an enormous amount of human writing — books, articles, forums and manuals — but has never lived a single day of real life. No job, no relationships, no consequences. They sound incredibly knowledgeable because they've absorbed how language works, how ideas connect, how arguments are built. But they don't <em>understand</em> any of it the way you do — through experience, through getting things wrong, through building judgment one decision at a time over a career.</p>
  <p>So the honest picture isn't a robot genius, and it isn't a toy. It's <strong>the most talented new hire you'll ever manage:</strong> superhuman range, astonishing speed, first drafts that'll genuinely scare you — and zero lived judgment, no sense of your office politics, no stake in what happens if it's wrong. That's where you come in. You onboard it, you manage it, you review its work. <em>And you've done this all before.</em></p>
  <p>Here is what is happening underneath the draft. During training, a language model learns patterns from large amounts of material. When you make a request, it uses those learned patterns and the context available for that answer to generate a response. Your request helps shape what it writes; it does not turn the draft into a checked fact. ChatGPT, Claude and Gemini are products around models. They can add things such as saved preferences, files and search. What reaches the answer depends on the product, its settings and this particular task.</p>

  <div class="mark"><div class="k">Limit one — context</div><h2>Cher's Closet Can't See the Room</h2></div>
  <figure class="film" aria-label="Cher's closet computer cannot know the context outside its screen">
    <div class="frames" data-frames="ep01-scene-09-chers-closet.png"><img src="../assets/episodes/ep-01/pixel/delivery-20260719-master-v1/ep01-cher-closet-comic.png" alt="" loading="lazy"></div>
    <figcaption class="film-cap">Endless outfit combinations — no idea the client is hostile.</figcaption>
  </figure>
  <p>Limit one: it may be missing context that matters. Think of Cher's closet computer from <em>Clueless</em>: having the wardrobe does not tell you what the occasion calls for. An AI product might have a saved preference or an earlier message available, but that does not mean it has the detail you need today. My email needed to sound firm without promising something I could not deliver. I had to make that clear. Giving useful, permitted context is a skill—<em>it's literally next week's episode.</em></p>

  <div class="mark"><div class="k">Limit two — hallucination</div><h2>The Burn Book Problem</h2></div>
  <figure class="film" aria-label="The Burn Book as a warning about confident invented details">
    <div class="frames" data-frames="ep01-scene-10-burn-book.png"><img src="../assets/episodes/ep-01/pixel/delivery-20260719-master-v1/ep01-burn-book-regina-comic-textfix.png" alt="" loading="lazy"></div>
    <figcaption class="film-cap">An allegation can sound certain and still be false.</figcaption>
  </figure>
  <p>Limit two: AI can be confidently, spectacularly wrong. A generated answer can sound polished and plausible while containing unsupported or invented information. It's the Burn Book from <em>Mean Girls:</em> a false allegation can arrive with total confidence. "Made out with a hot dog" lands with the certainty of a fact. <strong>Regina George energy, but make it software.</strong></p>
  <blockquote class="pull"><p>Your job is knowing which parts to trust and which to push back on. You've been doing that with other people's work your entire career. <em>This is no different.</em></p></blockquote>

  <div class="mark"><div class="k">The takeaway</div><h2>Cher Had a Point</h2></div>
  <figure class="film" aria-label="Cher’s classroom speech from Clueless">
    <div class="frames" data-frames="ep01-scene-11-dont-pull-a-cher.png"><img src="../assets/episodes/ep-01/pixel/delivery-20260719-master-v1/ep01-rsvp-cher-comic-textfix.png" alt="" loading="lazy"></div>
    <figcaption class="film-cap">Confident is not the same as correct. Keep your judgment on the output.</figcaption>
  </figure>
  <p>Cher was right: it doesn’t say "R.S.V.P." on the Statue of Liberty. But confident delivery isn’t what makes a claim correct, in a group chat or in a chatbot. Use AI to get a draft moving, give it relevant context you are permitted to share, and check the whole result against what you know—not just the bits that sound uncertain. You don't need a technical background. You need someone to explain it clearly and a group of women to figure it out with. That's this. One Wednesday at a time.</p>

  <!-- COCKTAIL -->
  <div class="cocktail">
    <p class="eyebrow">Say it at happy hour</p>
    <h3>"So… what IS AI?"</h3>
    <p>It learned patterns. It can make a draft. You still check the work. Managing a new hire is a useful comparison for giving a brief and reviewing the result. The system itself is software: it has no lived experience or responsibility for what you do with its answer.</p>
  </div>

  <!-- SIGN-OFF -->
  <section class="signoff">
    <p class="eyebrow">So remember, ladies…</p>
    <h2>You'll need more than a cup of ambition to keep up in the male-dominated world of AI. Lucky for you, this series comes in small sips.</h2>
  </section>
  <p class="rooms">Got a sharper "remember, ladies" line that would make Dolly proud? Take it to one of the <a href="/sorority-house.html"><strong>discussion rooms at Delta LAi Nu</strong></a>. You can explore without a Resident Card; posting uses the room provider's own sign-in. If we feature your line later, the credit stays yours.</p>

  <!-- NEXT -->
  <div class="next">
    <p class="eyebrow">Next week on L<span class="ai">Ai</span>DIES</p>
    <h3>Episode 02 · Tell Me What You Want</h3>
    <p>She learns to actually talk to AI so it gives her something useful back. Turns out prompting is just delegation — and she already knows how to do that. See you next Wednesday, in SUNNYVAiLE.</p>
  </div>

  <!-- FIELD TRIP -->
  <div class="tryon">
    <p class="eyebrow">Try it now</p>
    <h3>Get in, loser. We're learning AI.</h3>
    <p>Give ChatGPT, Claude and Gemini the same small request using information you are comfortable and permitted to share. A personal-life task works: ask for a short invitation to a book-club evening, using invented names and details. Compare what each understood, what you could use and what you would change. If you have access to only one product today, try it there and keep your result; you can add the comparison later. These are current product experiences, not a permanent model ranking. Your Try-On holds the request, your observations and the version you decide to keep.</p>
    <a class="btn" href="/blend-snap.html#the-study-pack">Open the Study Pack →</a>
  </div>

  <!-- THE VOCAB — key terms + definitions (written-only; each term will link to its full entry in the LIBRAiRY Reference shelf once the glossary is built) -->
  <div class="mark" id="vocab"><div class="k">Three terms worth keeping</div><h2>The Vocab</h2><div class="sub">What they mean, why they matter and the line to carry into the meeting.</div></div>
  <div class="gloss">
    <details open>
      <summary><span class="term">Generative AI</span><span class="peek">The kind of AI that can make something you can work with.</span><span class="plus">+</span></summary>
      <p class="def">Generative AI produces content from your request and the material you give it—an email, image, summary, slide, song, video or piece of code. It works from patterns learned during training plus the context available now. If the product searches, those sources become material for the answer; they do not make every claim true. <strong>It can make the draft. It cannot make it true.</strong></p>
    </details>
    <details>
      <summary><span class="term">Model</span><span class="peek">The trained component that turns an input into an output.</span><span class="plus">+</span></summary>
      <p class="def">A model is the trained component of an AI system that turns an input into an output. It may produce words or images, interpret material, make a prediction or choose a next action. You may reach one through an app, API or coding tool; the product around it can add instructions, memory, search, files and other models. ChatGPT, Claude and Gemini are whole products—not one permanent model apiece. <strong>A model is part of the experience—not the whole thing.</strong> Episode 05 gives this relationship its full fashion-house fitting.</p>
    </details>
    <details>
      <summary><span class="term">Hallucination</span><span class="peek">A made-up detail that arrives dressed like a fact.</span><span class="plus">+</span></summary>
      <p class="def">A hallucination is false or unsupported content delivered as part of an AI-generated answer. It can be one invented citation, wrong date or made-up detail inside otherwise useful work—not only a completely fictional response. Think of the Burn Book from <em>Mean Girls</em>: the tone supplies no warning label when an allegation is false. <strong>Polished is a style. Evidence is a standard.</strong></p>
    </details>
  </div>

</main>

<section class="episode-related" aria-labelledby="episode-related-title">
  <p class="eyebrow">Continue this idea</p>
  <h2 id="episode-related-title">Your next useful step</h2>
  <p>Episode 01 gets you through the door. Continue with the next episode when you’re ready to turn that first try into a brief AI can actually use.</p>
  <div class="episode-related__links">
    <a class="episode-related__link" href="/issues/issue-02.html">
      <strong>Episode 02 · Tell Me What You Want</strong>
      <span>Learn how context and specificity turn a vague request into useful work.</span>
    </a>
  </div>
  <p class="episode-related__truth">Classes, Library sections and NewsStand stories appear here only after their exact destination is admitted and directly extends this lesson.</p>
</section>

<!-- CAST -->
<section class="cast"><div class="cast-in">
  <span class="eyebrow">The cast of this episode</span>
  <h2>Dolly &amp; the cast of "{{EP:title}}"</h2>
  <p>Dolly is this episode’s Patron Saint of Common Sense: start with a task you know, then use your judgment to decide what earns a place in your life.</p>
  <div class="cast-grid">
    <a class="cast-card" href="/luminairy.html"><span class="cast-portrait-held" aria-hidden="true">Portrait held</span><b>Cher Horowitz</b><span>The closet computer · context is yours</span></a>
    <a class="cast-card" href="/luminairy.html"><span class="cast-portrait-held" aria-hidden="true">Portrait held</span><b>Dolly Parton</b><span>Patron Saint · Common Sense</span></a>
    <a class="cast-card" href="/luminairy.html"><span class="cast-portrait-held" aria-hidden="true">Portrait held</span><b>Fei-Fei Li</b><span>MAiVEN · Who gets to shape AI?</span></a>
    <a class="cast-card" href="/luminairy.html"><span class="cast-portrait-held" aria-hidden="true">Portrait held</span><b>Regina George</b><span>Anti-Saint · Dangerous Confidence</span></a>
  </div>
</div></section>

<!-- RAIL -->
<div class="rail">
  <span class="eyebrow">Everything in this episode</span>
  <div class="rail-row">
    <a class="rail-btn rb1" href="/watch.html?ep=01">Listen<small>Narration</small></a>
    <a class="rail-btn rb2" href="/blend-snap.html#the-study-pack">Study Pack<small>Availability checked at the café</small></a>
    <a class="rail-btn rb4" href="/radio.html">The Song<small>This week's track</small></a>
    <a class="rail-btn rb6" href="/bronze-aige.html#answers">Cocktail<small>So… what IS AI?</small></a>
    <a class="rail-btn rb3" href="/sorority-house.html">Rooms<small>See the discussion rooms at Delta LAi Nu</small></a>
    <a class="rail-btn rb5" href="/learn/quiz.html">Quiz<small>Check what you learned</small></a>
  </div>
</div>

<script>
/* Point each Maven portrait at that Maven's bio on the LUMiNAiRY (deep-link ?meet=<slug>) */
(function(){
  function slug(img){ var m=(img&&img.getAttribute('src')||'').match(/\/([a-z-]+)-y2k-stained-glass\.png/i); return m?m[1]:''; }
  function link(s){ return '/luminairy.html?meet='+s+'#mavens'; }
  document.querySelectorAll('.cast-card').forEach(function(a){
    var s=slug(a.querySelector('img')); if(s) a.setAttribute('href', link(s));
  });
  document.querySelectorAll('.idcard > img').forEach(function(img){
    var s=slug(img); if(!s) return;
    img.style.cursor='pointer';
    img.setAttribute('title','Meet her at the LUMiNAiRY');
    img.addEventListener('click', function(){ window.location.href=link(s); });
  });
})();
</script>
</body>
</html>
```

## Narration
```text
[tv announcer] On this season of ladies: she stops feeling behind. She learns to delegate to machines — without lowering her standards. She builds her own little squad of AI helpers. And she becomes the woman other people come to when the future gets confusing. [playful] And on this episode: our heroine finally stops putting it off. This is Episode One: {{EP:title}}.

It's 4:52 on a Tuesday afternoon, and a man named Steve is being called a visionary.

Steve works in revenue operations. Steve has never once refilled the printer. And Steve has just presented a competitive analysis — clean, confident, suspiciously well-formatted — that everyone in that room knows took him about an hour, because at lunch he was playing pickleball. [dry] I know because he told us. Twice.

And me? I had a version of that same analysis. Mine took two weekends. Mine had footnotes. Mine was still sitting in my drafts folder, waiting until it felt... ready.

Somewhere between Steve's standing ovation and my fourth coffee, it hit me. He isn't smarter than me. He isn't better informed. He just stopped doing it the hard way. [thoughtful] And I couldn't help but wonder... when did everyone learn to do that? And when, exactly, was I supposed to?

Welcome to ladies — where smart, busy women learn AI one Wednesday at a time, from a little internet town called Sunnyvale. New here? check out the trailer first. It's the tour. This is where the story starts. And that "she" from the promo? That's me. I'm telling this from a few steps ahead — I've made the mistakes, done the reading, and kept the receipts — and as the season goes on, you'll hear from other women figuring it out in real time. This isn't a lecture. It's a group chat. So if Steve sounded familiar — if you have ever sat on work that was better than what got the applause — [dry] get in loser. [smirk] We're learning AI...

So. Let me tell you what I did after the Steve meeting. [dry] Nothing. For six months. Well — not nothing. I did what every competent woman does with a problem she doesn't have time for: I put it on a list.

And in my defense, every time I tried to start, the on-ramp was terrible. Everything I found was either written by men in fleece vests — [dry] say no more — or so surface-level it basically amounted to "AI is transformative!" AI is transformative? [dry, sarcasm, deadpan] Groundbreaking.

Here's the thing. I have a full-time job. I manage a team. My calendar is a Tetris game I am perpetually losing. So the idea of adding "become AI-literate" to that pile felt about as realistic as Miranda Priestly asking me to fetch the unpublished Harry Potter manuscript. [dry, mildly exasperated] Technically possible — but at what personal cost?

Then one night — eleven p.m., everyone else asleep, glass of wine — I went looking for a different answer. And somewhere past the third search result... I found a town. An actual little internet town, permanently set in nineteen ninety-nine, with a main street, a radio station, and a library that never closes. [dry] It's that kind of place. I didn't know it yet, but I was moving in. And that first night, in that library, the question I brought wasn't "how do I learn AI." It was: is it just me? [pointed] It was not just me.

[measured] I found the latest Harvard review. It pulls together seventy-six sources from more than one hundred countries. In the studies that reported women’s and men’s use, forty-seven point eight percent of men were using generative AI, compared with thirty-nine point three percent of women. That is a relative gap of twenty-two percent. The gap had been narrowing. Then, from early twenty twenty-five, it stalled at around sixteen percent. [pointed] That is not a talent gap. It is a participation gap. And participation is how you get practice, influence, and a say in what gets built.

And the deeper I read, the worse it got. In Lean In's twenty twenty-six survey of US adults, men were about twenty-three percent more likely to be encouraged by their managers to use AI. Among people who had used it at work, men were about twenty-seven percent more likely to be praised. Steve got called a visionary, remember. And women? [pointed] We were about thirty-two percent more likely to worry that using AI looks like cutting corners.

[knowing] That one hit me like Samantha Jones delivering an uncomfortable truth over brunch. Because of course we worry about that. We've spent entire careers building credibility through preparation, thoroughness, visible effort. And now there's a tool that makes hard things look easy — and some part of our brain calculates, correctly, based on historical data, that "easy" might get held against us. [dry, pointed] That's not imposter syndrome. That's pattern recognition. Which is ironic, given what AI actually is — but we'll get there.

You know how there's always one person who preps the deck before the meeting, remembers the feedback from last time, follows up on the action items nobody else tracked — and still delivers her own work on time? [dry, knowing] That person is usually not named Steve. [chuckles] No offense to the Steves out there fighting the good fight. So no — this was never a confidence problem. It's a physics problem. You cannot add hours to a day that's already over-subscribed. And the irony is, the tool that could give you your time back requires time you don't have to learn it. So you don't start. And the gap compounds, week over week, until the distance between you and the colleague who started six months ago isn't a gap anymore. It's a canyon. As Dolly would say...

[warm, folksy, smiling, Tennessee accent] You'd better get to {{EP:dolly_bridge}}, honey — because ain't nobody building it for you.

[thoughtful] One plank. A task small enough to try, familiar enough that I could judge whether it actually helped. Dolly is our patron saint of common sense for a reason.

One more thing I found that night: Fei-Fei Li, the Stanford computer scientist, co-founded AI for All to widen participation in AI education. And that made my question bigger. Who gets to help shape this technology? People who use the tools can notice whose needs they miss, challenge poor results and ask for something better. Using a chatbot does not automatically retrain its model. But being able to question it matters—in the meeting where it is bought, the task where it is used, and the decision to stop when it gets something wrong.

So here's what finally got me to start. It wasn't inspiration. [dry] It was spite. Fine — it was mostly spite, plus a Sunday morning at the Blend and Snap — my corner table, an oat latte going cold, the radio on low — fifteen quiet minutes, and nothing to lose.

There was an email I'd been avoiding for four days. You know the kind — the delicate one, to the stakeholder who reads tone into line breaks. I opened one of the AI tools, and instead of asking it something grand, I described the situation without pasting the correspondence or naming anyone: what the message needed to achieve, the tone I wanted and what it must not promise. For work, the tool and the information have to be allowed by your employer. A personal subscription does not settle that. It gave me a draft in nine seconds. [thoughtful] And it was... eighty percent right. The other twenty percent was wrong in ways only I could see — which, it turns out, is the good news. I fixed it with my own judgment. I hit send. And then I looked at the clock. Four days of dread. Eleven minutes of work. And that's when it landed: oh. I can do this. Because the thing stopping me was never ability. It was that nobody had explained it in a way that made me want to start.

Now — I want to be clear. I am no AI slayer. [wry] There's no Watcher guiding me through some prophecy, no training montage that happened off-screen. I'm still learning, still getting things wrong, still googling things mid-conversation. But here's my favourite stat I've found so far, and it's the one that keeps me going. In BCG's twenty twenty-four survey of tech-company employees, senior women in technical functions reported using generative AI more than men in those same roles—by fourteen percentage points. [pointed] So the overall gap is not the whole story. In that group, women were already ahead on using the tools. And what you bring to it is knowledge of your own work: the details this draft may not have. The instinct that something is off in a document before you can even articulate why. That twenty percent of my email only I could see? [smile] That's your critical thinking.

Which brings me to my favourite part of every episode. We call it the cocktail party explanation, and it was born at the Bronze Age — that's our bar in Sunnyvale — during businesswomen's special happy hour. I was three sips into telling my girlfriends about the email thing when one of them put down her drink and said, "okay, but what IS it? Actually?" [dry] The table went quiet. Everybody wanted to know. Nobody wanted to be the one to ask. So now, every week, this segment hands you the answer you'll give the next time somebody at a dinner table — or a happy hour — says "AI" like they know what they're talking about. This week's question is the big one: what is this thing, actually? And I'll give you exactly what I gave the girls.

[deliberate] It's the most talented new hire you'll ever manage. [beat] That comparison is useful for how you manage the work. The system itself is software, with no human experience or responsibility. It has been trained on large amounts of material: books, articles, forums and manuals — it's absorbed how language works, how ideas connect, how arguments get built. That's why it sounds so impressive. And it has lived nothing: no job, no relationships, no consequences, not one awkward moment at a holiday party that taught it something about people. So the honest picture isn't a robot genius, and it isn't a toy. It's day-one talent: superhuman range, astonishing speed, first drafts that'll genuinely scare you — and no read on your office politics, no stake in what happens if it's wrong. That's where you come in. You don't hand it the keys — you onboard it. You give it guidance and guardrails, the lay of the land around the office. You manage it, and you review its work. [knowing] And you've done this all before.

Here is what is happening underneath the draft. During training, a language model learns patterns from large amounts of material. When you make a request, it uses those learned patterns and the context available for that answer to generate a response. Your request helps shape what it writes; it does not turn the draft into a checked fact. ChatGPT, Claude and Gemini are products around models. They can add things such as saved preferences, files and search. What reaches the answer depends on the product, its settings and this particular task.

Limit one: it may be missing context that matters. Think of Cher's closet computer from Clueless: having the wardrobe does not tell you what the occasion calls for. An AI product might have a saved preference or an earlier message available, but that does not mean it has the detail you need today. My email needed to sound firm without promising something I could not deliver. I had to make that clear. Giving useful, permitted context is a skill—and it is literally next week's episode.

Limit two: the answer can look finished and still contain something false or unsupported. That is a hallucination. It does not have to be a whole fantasy; one invented citation, wrong date, or made-up detail is enough. Think of the Burn Book from Mean Girls: a false allegation can arrive with total confidence. [incredulous, almost laughing] "Made out with a hot dog"? It lands like a documented fact. [smirk, deadpan] Regina George energy. But make it AI. Polished is a style. Evidence is a standard.

Three words before you go. Cher was right: it does not say R-S-V-P on the Statue of Liberty. [chuckles] But confident delivery is not a fact-check. Here is what these words actually mean.

Generative AI: AI that can turn your request and the material you give it into content — an email, image, summary, slide, song, video, or piece of code. It can make the draft. It cannot make it true.

Model: the trained component that turns an input into an output. You use it through a product. The product around it can add instructions, memory, search, files, and other models. A model is part of the experience—not the whole thing.

And hallucination: a false or unsupported detail dressed like part of the answer. It is not lying — lying takes intent. And it does not have to ruin the whole response to matter. One wrong citation can sit inside otherwise useful work. Polished is a style. Evidence is a standard.

[sweet, bubbly, sincere] I'm not a regular mom — I'm a cool mom.

[dry deadpan] That's AI trying to be helpful and completely misreading the room.  And your job, in all of this, is knowing which parts to trust and which to push back on. Which — good news — is exactly what you've been doing with other people's work your entire career, and we're going to help you apply those skills to AI over the season.

[warm] And... that's the episode. Now — your try-on. Not homework; this isn't school. Ten minutes, and everything you need lives at ladies dot A I. That's "ladies" spelled with an i in the middle: L, A, i, D, I, E, S. And if you'd rather read than listen, the whole episode's written up there too — every stat and study laid out where you can find it again.

Inside is the try-on, and this week, you are holding auditions. Give Chat G-P-T, Claude and Gemini the same small request using information you are comfortable and permitted to share. A personal-life task works: ask for a short invitation to a book-club evening, using invented names and details. Compare what each understood, what you could use and what you would change. If you have access to only one product today, try it there and keep your result; you can add the comparison later. These are current product experiences, not a permanent model ranking. Your try-on holds the request, your observations and the version you decide to keep. Then, if you're feeling it: take the pop quiz at Sunnyvale High — ten questions on today's episode, plus 2 bonus questions [smirk] your score banks butterfly clips, and yes, that will make sense when you get there. Turn on K-S-V-L, ninety-nine point nine, for this week's anthem — don't just learn from books, learn from hooks. And if you've got time to wander, the town is full of extras: get your cards read at Madame Cleo's, call nineteen ninety-nine from the Dream Phone, ask the Fairy Godmother anything — and somewhere around town there's hidden charms. Find one, and it's yours. And if this is your first Wednesday with us, make it official: stop by Makeover on Main and get your residence card. Two minutes, free, and everything you collect starts counting.

[warm] So remember, ladies: you'll need more than a cup of ambition to keep up in the male-dominated world of AI. Lucky for you... this series comes in small sips.

Oh — and every episode ends with a "Remember, ladies." If you've got a sharper one than mine — one that would make Dolly proud — post it in the rooms at Delta LAi Nu, our sorority house in Sunnyvale. ICQ walked so our chat rooms could run. You can explore without a Resident Card; the rooms have their own sign-in for posting. Favourites get featured in a future episode, with credit. [smirk] We're trailblazers here. Not idea thieves.

[warm, smiling] See you next Wednesday... in Sunnyvale.

[tv announcer] Next time on ladies: our heroine learns how to actually talk to AI, so it gives her something useful back. And it turns out... prompting is just delegation. Which — let's be honest — she already knows how to do. Tune in next week for Episode 2: Tell Me What You Want.
```
