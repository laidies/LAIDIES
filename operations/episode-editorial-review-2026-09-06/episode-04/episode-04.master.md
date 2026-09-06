# Episode 04 — The Founding Mothers · paired production master

Status: PRODUCER REPAIR — preserved source, not yet revised or admitted. This extraction retains the full written edition and tagged narration, including known correction targets. No current factual, design, audio or publication approval is implied.

Patron Saint direction: Sister Mary Clarence — Teaching is the proposed lesson frame. Historical women retain their authored stories; Hedy dialogue is protected by D-2026-09-05-139.

Source authority: Current tagged narration governs; the old episode-04-script.md is explicitly stale and absent. Preserve narration-only beats and article-only Turing memoriam for reconciliation.

Episodes 1–3 together govern voice, tone and Rewind reference density. Correct meaning here, then export both editions; shared literal title changes update both without flattening the reading layout or dropping performance cues.

## Export settings
```json
{
  "episode": 4,
  "status": "PRODUCER_REPAIR",
  "shared": {
    "title": "The Founding Mothers"
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
<title>Episode 04 · {{EP:title}} · LAiDIES · SUNNYVAiLE</title>
<meta name="description" content="The one where she goes looking for where AI even came from — and finds out it was women all along.">
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
  html,body{max-width:100%;overflow-x:hidden}
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
    background:linear-gradient(180deg,rgba(14,9,24,.46) 0%,rgba(11,7,18,.72) 66%,rgba(11,7,18,.94) 100%), url('../assets/episodes/ep-04/pixel/ep04-open-04-desk-comic-v1-face-lock-1920.png') center 30%/cover}
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
  .film .frames--held{display:grid;place-items:center;padding:clamp(28px,6vw,72px);text-align:center;background:linear-gradient(145deg,#251a3d 0%,#5f4685 48%,#c96652 115%)}
  .film .frames--held span{max-width:720px;color:#fff;font:800 clamp(1.25rem,3.5vw,2.65rem)/1.08 'Jost',sans-serif;letter-spacing:-.025em;text-shadow:0 3px 20px rgba(0,0,0,.35)}
  .film::after{content:"";position:absolute;inset:0;z-index:2;pointer-events:none;background:repeating-linear-gradient(to bottom,transparent 0 3px,rgba(0,0,0,.12) 3px 6px);mix-blend-mode:multiply}
  .film-bug{position:absolute;top:13px;right:15px;z-index:3;font-family:'VT323',monospace;font-size:1rem;color:var(--cream);letter-spacing:.1em;text-shadow:0 1px 5px rgba(0,0,0,.8)}
  .film-cap{position:absolute;left:0;right:0;bottom:0;z-index:3;padding:32px 20px 14px;color:var(--cream);font-family:'VT323',monospace;font-size:1.08rem;letter-spacing:.04em;background:linear-gradient(0deg,rgba(12,6,14,.9),transparent)}

  /* Maven identity card (small credit beneath the scene film) */
  .idcard{max-width:var(--measure);margin:16px auto 0;display:flex;align-items:center;gap:16px}
  .idcard>img{width:66px;height:99px;object-fit:cover;border-radius:8px;border:1px solid rgba(201,162,39,.5);flex:none;box-shadow:0 12px 26px -14px rgba(58,24,56,.6)}
  .idcard .idcard-held{width:66px;height:99px;display:grid;place-items:center;border-radius:8px;border:1px dashed rgba(201,162,39,.8);background:linear-gradient(145deg,#302047,#76598c);color:#f7e7a8;font:800 2rem/1 'Playfair Display',serif;flex:none;box-shadow:0 12px 26px -14px rgba(58,24,56,.6)}
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
  .trio .cast-portrait-held{min-height:180px}
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

  /* Study pack — expandable "four words, defined" */
  .gloss{max-width:var(--measure);margin:20px auto 0}
  .gloss details{border:1px solid rgba(203,184,232,.28);border-radius:12px;margin-bottom:12px;background:rgba(179,171,231,.05)}
  .gloss .concept-art{display:block;width:100%;max-width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:10px;margin:0 18px 12px;width:calc(100% - 36px)}
    .gloss summary{list-style:none;cursor:pointer;padding:14px 18px;display:flex;align-items:center;gap:14px}
  .gloss summary::-webkit-details-marker{display:none}
  .gloss .term{font-weight:800;font-size:1.14rem;color:#fff;flex:none}
  .gloss .peek{font-size:.95rem;color:#c3b2d8;flex:1;line-height:1.35}
  .gloss .plus{font-family:'VT323',monospace;font-size:1.5rem;color:#7be0d0;flex:none;transition:transform .15s}
  .gloss details[open] .plus{transform:rotate(45deg)}
  .gloss .def{padding:0 18px 16px;margin:0;max-width:none;color:#e3d9ef;font-size:1rem;line-height:1.6}
  @media(max-width:560px){ .gloss summary{flex-wrap:wrap} .gloss .peek{flex-basis:100%;order:3} }

  /* In memoriam aside (Alan Turing) — mirrors the LUMiNAiRY */
  .memoriam{max-width:var(--measure);margin:56px auto 8px;padding:30px 28px 26px;text-align:center;border-top:1px solid rgba(201,162,39,.45);border-bottom:1px solid rgba(201,162,39,.45)}
  .memoriam .mem-k{font-family:'VT323',monospace;font-size:1.05rem;letter-spacing:.24em;text-transform:uppercase;color:var(--gold);margin-bottom:14px}
  .memoriam img{width:92px;height:92px;object-fit:cover;border-radius:12px;border:1.5px solid var(--gold);margin:0 auto 14px;display:block}
  .memoriam h3{font-weight:800;font-size:1.5rem;color:#fff;margin:0 0 14px;line-height:1.15}
  .memoriam h3 span{display:block;font-size:.82rem;font-weight:400;opacity:.65;margin-top:5px;font-family:'VT323',monospace;letter-spacing:.08em}
  .memoriam p{max-width:none;margin:0 auto;font-size:1rem;line-height:1.7;color:#e3d9ef;opacity:.92}

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

  @media(max-width:640px){ body{font-size:16.5px} .tv-title{font-size:2.5rem} .trio{grid-template-columns:1fr} .cast-grid{grid-template-columns:repeat(2,minmax(0,1fr))} }
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
  <link rel="canonical" href="https://laidies.ai/issues/issue-04" />
  <meta property="og:url" content="https://laidies.ai/issues/issue-04" />
</head>
<body class="issue-feature issue-feature--04">

<!-- Canonical town header (sv-global-header.js rewrites this in place) -->
<header class="sv-header"></header>

<!-- CINEMATIC PIXEL HERO — the tape, paused on its opening frame -->
<header class="tv-hero">
  <div class="osd"><span>❚❚ SP</span><span>S1 · E04</span></div>
  <p class="tv-meta">SEASON 1 · EPISODE 04 · ACT 1: THE AWAKENING</p>
  <h1 class="tv-title">The Founding <em>Mothers</em></h1>
  <p class="tv-logline">The one where she's talked to this thing every day for three weeks — and has no idea where it came from. So she goes looking for the origin story, and finds out it was women all along.</p>
  <div class="tv-tags"><span>LESSON · <b>AI was never one thing — or new</b></span><span>STARS · <b>The M<span class="ai">Ai</span>VENS</b></span><span><b>~12 MIN READ</b></span></div>
  <a class="hero-listen" href="/watch.html?ep=04">▶ Listen to this episode</a>
</header>

<div class="spine"><div class="spine-inner">SUNNYVAiLE VIDEO <span class="dot">·</span> S1 E04 <span class="dot">·</span> SP <span class="dot">·</span> ❚❚ <span class="end">BE KIND, REWIND ⟲</span></div></div>

<main>

  <div class="prev">
    <p class="eyebrow">◀◀ Previously, on L<span class="ai">Ai</span>DIES</p>
    <p>Our heroine got a gorgeous, confident answer from the machine — and caught the one quiet line in it that was completely, confidently wrong. She learned that before her name goes on anything, she checks it like Elle Woods.</p>
  </div>

  <div class="mark"><div class="k">Cold open</div></div>
  <figure class="film" aria-label="Scene 01 — cold open, the desk">
    <div class="frames" data-frames="ep04-scene-01-cold-open-v2.png|ep04-scene-01-cold-open-v2-c-end.png"><img src="../assets/episodes/ep-04/pixel/ep04-title-card-comic-v2.png" alt="" loading="lazy"></div>
    <span class="film-bug">S1·E04 · SC 01</span>
    <figcaption class="film-cap">A slow Wednesday — and it hits her mid-sentence.</figcaption>
  </figure>
  <p class="lead">It's a slow Wednesday, and it hits me mid-sentence — I actually stop typing.</p>
  <p>I have been talking to this thing every single day for three weeks. I've briefed it, argued with it, caught it lying to my face. And I could not tell you the first thing about where it came from. What it even is. Who made it.</p>
  <p>It's like I moved in with someone and realized I'd never once asked to meet their family. And I couldn't help but wonder — this thing that showed up and rearranged my whole workweek: is it actually <em>new?</em> And underneath that: who <em>built</em> it?</p>
  <p>Three weeks ago you stopped feeling behind. Then you learned to brief it like a new hire. Last week, to fact-check it like a lawyer. So you can genuinely <em>use</em> the thing now. But I'd learned to drive the car without ever once asking who built the engine. So this week: no new trick. This week's a flashback.</p>

  <div class="mark"><div class="k">This week, a flashback</div><h2>The quiet wing at the back of the LUMIN<span class="ai">Ai</span>RY</h2><div class="sub">Everyone knows the front room — the patron saints, the Chers and the Elles. Almost nobody walks to the back.</div></div>

  <figure class="film" aria-label="Scene 02 — into the LUMiNAiRY">
    <div class="frames frames--held" data-portrait-art="held"><span>The quiet wing · history without invented portraits</span></div>
    <span class="film-bug">S1·E04 · SC 02</span>
    <figcaption class="film-cap">Up the hill, into the quiet wing behind the saints.</figcaption>
  </figure>

  <p>So I went up the hill, to the <strong>LUMINAiRY</strong> — SUNNYVAiLE's hall of heroes. Everybody knows the front room. But there's a quieter wing behind it I'd never once walked into. No movie stars in there. <em>…Well. Almost no movie stars.</em> Just the women who actually built the thing this whole town is about. They call them the <strong>MAiVENS</strong>. Sit down in that wing and ask "so, how did we get here" — and they'll tell you the entire story. The lights go soft. Somewhere, a harp. Stay with me. We're going back.</p>

  <!-- ADA -->
  <div class="scene" id="algorithm-story">
    <div class="mark"><div class="k">1843 · The Idea</div><h2>The first algorithm, for a machine nobody had built</h2><div class="sub">She saw that numbers were only the beginning. For a hundred years the credit went to the man whose machine it was.</div></div>
    <figure class="film" aria-label="Scene 03 — Ada Lovelace, 1843">
      <div class="frames frames--held" data-portrait-art="held"><span>1843 · Ada Lovelace sees music where others see arithmetic</span></div>
      <span class="film-bug">S1·E04 · SC 03</span>
      <figcaption class="film-cap">1843 — she saw music where everyone else saw arithmetic.</figcaption>
    </figure>
    <div class="idcard">
      <span class="idcard-held" aria-hidden="true">A</span>
      <div class="idmeta"><b>Ada Lovelace</b><span class="idrole">Keeper of the first algorithm</span></div>
    </div>
  </div>
  <p>It starts in the <strong>eighteen-forties</strong> — before the lightbulb — with a young woman staring at a giant mechanical calculator that could do exactly one thing: crunch numbers. Everyone who looked at it saw arithmetic. <em>Ada Lovelace looked at it and saw something else entirely.</em></p>
  <p>She understood the thing no one else did: if a machine can follow instructions written precisely enough, then numbers are only the beginning. It could work with symbols. It could set them to music. So she wrote the instructions down — a method, step by step, for the machine to follow. <strong>The first algorithm.</strong> And she told us exactly what it could and couldn't be: <em>it has no pretensions to originate anything. It only ever does what we know how to order it to do.</em> (Remember that part. Everyone forgets that part.)</p>
  <p>For the next hundred years, they handed the credit to the man whose machine it was — and quietly decided a woman couldn't possibly have done the math.</p>

  <!-- HEDY -->
  <div class="scene">
    <div class="mark"><div class="k">1942 · The Signal</div><h2>Inventing between takes</h2><div class="sub">Billed as the most beautiful woman in the world — so nobody watched what she was actually doing.</div></div>
    <figure class="film" aria-label="Scene 04 — Hedy Lamarr, 1942">
      <div class="frames frames--held" data-portrait-art="held"><span>1942 · Hedy Lamarr invents between takes</span></div>
      <span class="film-bug">S1·E04 · SC 04</span>
      <figcaption class="film-cap">1942 — the bombshell who was inventing between takes.</figcaption>
    </figure>
    <div class="idcard">
      <span class="idcard-held" aria-hidden="true">H</span>
      <div class="idmeta"><span class="cue c-pink"><span class="play">▶</span> 1942 · The Signal</span><b>Hedy Lamarr</b><span class="idrole">Keeper of the signal</span></div>
    </div>
  </div>
  <p>Jump ahead a century, to <strong>nineteen forty-two</strong>. This one you already know — billed, at the time, as the most beautiful woman in the world. Movie star. Bombshell. <em>And between takes, she was inventing.</em> "It is a very useful thing," she said, "to be underestimated — no one watches what you're actually doing."</p>
  <p>There was a war on, and the radio-controlled torpedoes kept getting jammed. So Hedy Lamarr and the composer George Antheil designed a system that <em>hops</em>: the signal leaps from frequency to frequency, too fast to catch — and the receiver hops right along with it. You cannot jam a signal you cannot find. The Navy shelved it. But that idea is in the family tree of the whole wireless world you're standing in — the Wi-Fi, the Bluetooth, the invisible hum that carries everything to everywhere. She never made a dime from it.</p>

  <!-- ENIAC SIX -->
  <div class="scene">
    
    <figure class="film emph" aria-label="Nobody heard a single word she said.">
      <div class="frames"><img src="../assets/episodes/ep-04/pixel/ep04-emph-nobody-heard-comic-v1-exact-text-1920.png" alt="Nobody heard a single word she said." loading="lazy"></div>
    </figure>
    <div class="mark"><div class="k">1945 · The First Program</div><h2>Six women, no manual, no language</h2><div class="sub">They programmed it by hand, cable by cable. The press decided they were models.</div></div>
    <figure class="film" aria-label="Scene 04B — the ENIAC Six, 1945">
      <div class="frames frames--held" data-portrait-art="held"><span>1945 · Six women program the ENIAC by hand</span></div>
      <span class="film-bug">S1·E04 · SC 04B</span>
      <figcaption class="film-cap">1945 — the first programmers. The press thought they were models.</figcaption>
    </figure>
    <div class="idcard">
      <span class="idcard-held" aria-hidden="true">6</span>
      <div class="idmeta"><span class="cue c-peri"><span class="play">▶</span> 1945 · The First Program</span><b>The ENIAC Six</b><span class="idrole">Jean · Betty · Kay · Marlyn · Ruth · Frances</span></div>
    </div>
  </div>
  <p><strong>Nineteen forty-five.</strong> The war still on, the Army in Philadelphia switches on one of the first true electronic computers — a <strong>thirty-ton, room-sized</strong> machine called the <strong>ENIAC</strong>, built to calculate artillery tables. But a machine that new doesn't come with instructions; someone has to teach it, physically, what to do. So the Army hands that job — the part they figured was the tedious part — to <strong>six women: Jean, Betty, Kay, Marlyn, Ruth, and Frances.</strong> With no manual and no programming language to write in — because one <em>didn't exist yet</em> — they program it by hand, cable by cable, switch by switch, working out how to make a machine follow a plan at all. <strong>They are, quite literally, the first programmers.</strong></p>
  <p>And when the ENIAC is shown to the press, the men in the photographs get named. The six women — standing right there, at the machine they'd programmed — do not. For decades, people who saw those pictures simply assumed they were <em>models</em>, posed to make the equipment look good. It took about forty years for anyone to go back and learn who they actually were.</p>

  <!-- GRACE -->
  <div class="scene" id="compiler-story">
    
    <figure class="film emph" aria-label="They are, quite literally, the first programmers.">
      <div class="frames"><img src="../assets/episodes/ep-04/pixel/ep04-emph-first-programmers-comic-v1-exact-text-1920.png" alt="They are, quite literally, the first programmers." loading="lazy"></div>
    </figure>
    <div class="mark"><div class="k">1952 · The Language</div><h2>She taught the machine to meet us halfway</h2><div class="sub">Why should a person have to think like a machine? So she built the thing that translates.</div></div>
    <figure class="film" aria-label="Scene 05 — Grace Hopper, 1952">
      <div class="frames frames--held" data-portrait-art="held"><span>1952 · Grace Hopper teaches the machine to meet us halfway</span></div>
      <span class="film-bug">S1·E04 · SC 05</span>
      <figcaption class="film-cap">1952 — why should a person have to think like a machine?</figcaption>
    </figure>
    <div class="idcard">
      <span class="idcard-held" aria-hidden="true">G</span>
      <div class="idmeta"><span class="cue c-tang"><span class="play">▶</span> 1952 · The Language</span><b>Grace Hopper</b><span class="idrole">Keeper of the compiler</span></div>
    </div>
  </div>
  <p><strong>Nineteen fifty-two.</strong> The machines are real now — but talking to one is agony. You had to write in raw code, by hand. Enter a mathematician the Navy almost didn't take — too old, they said, at thirty-six. They took her anyway. Thank goodness.</p>
  <p>They kept telling <strong>Grace Hopper</strong> a computer could never understand words. She found that a failure of imagination. <em>Why should a person have to learn to think like a machine?</em> So she built a translator — a <strong>compiler</strong>. You write what you want in something close to plain English, and it does the converting into code for you. Every app you tap sits on top of that one idea. (When an actual moth once flew into the machine and jammed it, her team taped it into the logbook — "first actual case of a bug being found." That's where <em>debugging</em> comes from.)</p>

  <!-- THE NAMING -->
  
    <figure class="film emph" aria-label="The first actual case of a bug being found.">
      <div class="frames"><img src="../assets/episodes/ep-04/pixel/ep04-emph-bug-comic-v1-exact-text-1920.png" alt="The first actual case of a bug being found." loading="lazy"></div>
    </figure>
    <div class="mark"><div class="k">1956 · The naming</div><h2>The men show up and give it a name</h2><div class="sub">A room at Dartmouth for the summer — and a promise that did not age well.</div></div>
  <figure class="film" aria-label="Scene 06 — the naming, Dartmouth 1956">
    <div class="frames" data-frames="ep04-scene-06-naming.png|ep04-scene-06-naming-c-end.png"><img src="../assets/episodes/ep-04/pixel/ep04-scene-06-naming-comic-v1-fresh-exact-board-1920.png" alt="" loading="lazy"></div>
    <span class="film-bug">S1·E04 · SC 06</span>
    <figcaption class="film-cap">1956 — they named it, and put their names on it.</figcaption>
  </figure>
  <p>It's right here — <strong>nineteen fifty-six</strong> — that a handful of men get a room at Dartmouth for the summer, write up a proposal, and christen the whole dream: "<strong>artificial intelligence.</strong>" Names on it as the founding fathers. And then they promise the world it'll be basically solved… by the end of the summer.</p>
  <blockquote class="pull"><p>It was <em>not</em> solved by the end of the summer.</p></blockquote>
  <p>It wasn't solved for decades. The funding dried up, the promises curdled, and "AI" became a slightly embarrassing thing to say out loud. They call those the <strong>AI winters</strong>. It got cold more than once. But even in the cold, the work didn't stop.</p>
  
    <figure class="film emph" aria-label="It was not solved by the end of the summer.">
      <div class="frames"><img src="../assets/episodes/ep-04/pixel/ep04-emph-not-solved-comic-v1-exact-text-1920.png" alt="It was not solved by the end of the summer." loading="lazy"></div>
    </figure>
    <div class="mark" id="ai-winter-story"><div class="k">After the promise · The AI winters</div><h2>AI became an embarrassing thing to say</h2><div class="sub">The funding dried up and the promises curdled. But even in the cold, the work didn't stop.</div></div>
    <figure class="film" aria-label="Scene 07 — the AI winter">
    <div class="frames" data-frames="ep04-scene-07-ai-winter.png|ep04-scene-07-ai-winter-c-end.png"><img src="../assets/episodes/ep-04/pixel/ep04-scene-07-ai-winter-comic-v1-fresh-1920.png" alt="" loading="lazy"></div>
    <span class="film-bug">S1·E04 · SC 07</span>
    <figcaption class="film-cap">It got cold more than once — but the work didn't stop.</figcaption>
  </figure>

  <!-- KAREN -->
  <div class="scene">
    <div class="mark"><div class="k">1972 · The Finding</div><h2>How a machine finds the right thing</h2><div class="sub">It's the rare words that carry the meaning — the arithmetic under every search box you've ever used.</div></div>
    <figure class="film" aria-label="Scene 08 — Karen Spärck Jones, 1972">
      <div class="frames frames--held" data-portrait-art="held"><span>1972 · Karen Spärck Jones finds meaning in the rare words</span></div>
      <span class="film-bug">S1·E04 · SC 08</span>
      <figcaption class="film-cap">1972 — it's the rare words that carry the meaning.</figcaption>
    </figure>
    <div class="idcard">
      <span class="idcard-held" aria-hidden="true">K</span>
      <div class="idmeta"><span class="cue c-sky"><span class="play">▶</span> 1972 · The Finding</span><b>Karen Spärck Jones</b><span class="idrole">Keeper of the finding</span></div>
    </div>
  </div>
  <p><strong>Nineteen seventy-two.</strong> A woman at Cambridge cracks a problem that turns out to be enormous: how does a machine find the <em>right</em> thing? Here's the trick <strong>Karen Spärck Jones</strong> saw — the common words tell you nothing. "The." "And." "Is." Useless. It's the <em>rare</em> words that carry the meaning. So she built a way to weigh them. It is the arithmetic underneath every search box you have ever typed into — and underneath the modern systems that go and look things up before they dare to answer you.</p>
  <p>She spent most of her career on short contracts — no permanent post until nineteen ninety-three, which she said plainly was because she was a woman. And she had a line she liked to repeat, that I want carved over the door of this entire episode:</p>
  <blockquote class="pull"><p>"Computing is too important to be left to <em>men.</em>"</p><div class="who">Karen Spärck Jones</div></blockquote>

  <!-- FEI-FEI -->
  <div class="scene" id="training-data-story">
    
    <figure class="film emph" aria-label="Computing is too important to be left to men.">
      <div class="frames"><img src="../assets/episodes/ep-04/pixel/ep04-emph-left-to-men-comic-v1-exact-text-1920.png" alt="Computing is too important to be left to men." loading="lazy"></div>
    </figure>
    <div class="mark"><div class="k">2012 · The Sight</div><h2>The brain was never the problem</h2><div class="sub">We'd never given it enough to look at. So she gave it millions upon millions of pictures.</div></div>
    <figure class="film" aria-label="Scene 09 — Fei-Fei Li, 2012">
      <div class="frames frames--held" data-portrait-art="held"><span>2012 · Fei-Fei Li gives the machine enough of the world to see</span></div>
      <span class="film-bug">S1·E04 · SC 09</span>
      <figcaption class="film-cap">2012 — she gave it enough to look at, and it finally saw.</figcaption>
    </figure>
    <div class="idcard">
      <span class="idcard-held" aria-hidden="true">F</span>
      <div class="idmeta"><span class="cue c-coral"><span class="play">▶</span> 2012 · The Sight</span><b>Fei-Fei Li</b><span class="idrole">Keeper of the field</span></div>
    </div>
  </div>
  <p>And then — decades later, after almost everyone had given up — the thaw. It comes from a professor at Stanford named <strong>Fei-Fei Li</strong>, and a heretical idea. Everyone was busy trying to build a smarter brain. She said the brain was never the problem — the problem was we'd never given it enough to look at. So she builds the thing everyone told her was too big to bother with: millions upon millions of labeled images — the <strong>training data</strong> — so a machine could finally learn what the world actually looks like.</p>
  <p>In <strong>twenty-twelve</strong>, a program trained on her pictures suddenly <em>sees.</em> That is the spark. The "AI boom" people won't stop talking about starts right there, with her data. The world took to calling her the Godmother of AI. <em>Godmother. Not godfather.</em></p>

  <!-- FAST FORWARD -->
  
    <figure class="film emph" aria-label="Godmother. Not godfather.">
      <div class="frames"><img src="../assets/episodes/ep-04/pixel/ep04-emph-godmother-comic-v1-exact-text-1920.png" alt="Godmother. Not godfather." loading="lazy"></div>
    </figure>
    <div class="mark"><div class="k">And then it moves fast</div><h2>The day it landed on your desk</h2></div>
  <figure class="film" aria-label="Scene 10 — it lands on your desk">
    <div class="frames" data-frames="ep04-scene-10-desk-v2.png|ep04-scene-10-desk-v2-c-end.png"><img src="../assets/episodes/ep-04/pixel/ep04-emph-landed-on-your-desk-comic-v1-exact-text-1920.png" alt="" loading="lazy"></div>
    <span class="film-bug">S1·E04 · SC 10</span>
    <figcaption class="film-cap">The day it landed on your desk — the same desk as three weeks ago.</figcaption>
  </figure>
  <p>In <strong>twenty-seventeen</strong>, a team at Google publishes a design that finally cracks how a machine handles language — and for the first time, the thing can really <em>write.</em> And then, one perfectly ordinary Wednesday — November <strong>twenty-twenty-two</strong> — someone wraps all of it in a little chat box, puts it online for free, and calls it ChatGPT.</p>
  <div class="receipt">
    <div class="h">How fast it landed</div>
    <div class="row"><span class="num">~100M</span><span class="txt">people using it in about two months — the fastest anything had ever caught on. The day AI stopped being a lab thing and became a <em>you</em> thing.</span></div>
    <span class="src">The "~100M in two months / fastest-growing app" figure is a widely-cited UBS/Similarweb <em>estimate</em>, not an OpenAI-confirmed number (verified 2026-07-09). The point holds either way: the science is old; your access to it is brand new.</span>
  </div>
  <p>That's the day it landed on your desk — the very desk you were sitting at three weeks ago, feeling behind.</p>

  <!-- THE CHECKERS -->
  <div class="mark"><div class="k">The part the highlight reel skips</div><h2>The women who check the whole machine</h2><div class="sub">As it got powerful, another set of women got loud — on purpose.</div></div>
  <figure class="film" aria-label="Scene 11 — the checkers">
    <div class="frames frames--held" data-portrait-art="held"><span>The women who check the whole machine</span></div>
    <span class="film-bug">S1·E04 · SC 11</span>
    <figcaption class="film-cap">The women who check the whole machine.</figcaption>
  </figure>
  <div class="trio">
    <figure><span class="cast-portrait-held" aria-hidden="true">Portrait held</span><figcaption>Joy Buolamwini · the mirror</figcaption></figure>
    <figure><span class="cast-portrait-held" aria-hidden="true">Portrait held</span><figcaption>Timnit Gebru · the room</figcaption></figure>
    <figure><span class="cast-portrait-held" aria-hidden="true">Portrait held</span><figcaption>Kate Crawford · the map</figcaption></figure>
  </div>
  <p><strong>Joy Buolamwini</strong>, a grad student at MIT, goes to use face-detection software — and it can't see her dark skin. Not until she literally holds up a white mask. So she proves it: tests the big commercial systems and shows they fail hardest of all on darker-skinned women.</p>
  <p><strong>Timnit Gebru</strong> teamed up with a linguist, <strong>Emily Bender</strong>, to warn that these language machines can sound brilliant while understanding nothing. Bender named it: a <em>stochastic parrot</em> — a bird that mimics speech perfectly, with not the faintest idea what it's saying. Gebru raised it inside Google, and in twenty-twenty she was abruptly gone. Thousands of her colleagues signed their names in protest.</p>
  <p>And <strong>Kate Crawford</strong> maps the part nobody wants to look at — that behind the "magic" is a supply chain of mines, water, electricity, and underpaid human hands. Her line: <em>AI is neither artificial nor intelligent.</em></p>
  <p>These are not the buzzkills at the party. They are the reason the thing you're about to trust is worth trusting. Last week you learned to check the machine. <strong>These are the women who check the whole machine.</strong></p>

  <!-- WRAP -->
  
    <figure class="film emph" aria-label="AI is neither artificial nor intelligent.">
      <div class="frames"><img src="../assets/episodes/ep-04/pixel/ep04-emph-neither-comic-v2-exact-mixed-case-1920.png" alt="AI is neither artificial nor intelligent." loading="lazy"></div>
    </figure>
    <div class="mark"><div class="k">The lights come up</div><h2>Not magic. Not born last Tuesday.</h2></div>
  <figure class="film" aria-label="Scene 12 — the lights come up">
    <div class="frames frames--held" data-portrait-art="held"><span>Almost two hundred years · and the lights come up</span></div>
    <span class="film-bug">S1·E04 · SC 12</span>
    <figcaption class="film-cap">Almost two hundred years, holding all of it.</figcaption>
  </figure>
  <p>And then the lights come up, and it's just me, in the back of the LUMINAiRY, holding all of it. Almost two hundred years. A room full of women, most of whom had to fight to be believed. One very confident chatbot. And <em>that</em> is what's been sitting quietly in your browser tab this whole time.</p>

  <!-- COCKTAIL -->
  <div class="cocktail">
    <p class="eyebrow">Say it at happy hour</p>
    <h3>"So… is this whole AI thing brand new, or what?"</h3>
    <p>It's almost two hundred years old and about three years old at the same time. The science has been building for centuries; your access to it is brand new. And every real leap in it — the idea, the signal, the language, the finding, the sight — has a woman's name on it. Whether or not the textbook bothered to write it down.</p>
  </div>

  <!-- SIGN-OFF -->
  <section class="signoff">
    <p class="eyebrow">So remember, ladies…</p>
    <h2>You were never behind on AI. You were just never told it was yours.</h2>
  </section>
  <p class="rooms">Got a sharper "remember, ladies" than that one? Take it to one of the <a href="/sorority-house.html"><strong>discussion rooms at Delta LAi Nu</strong></a>. You can explore without a Resident Card; posting uses the room provider's own sign-in. If we feature your line later, the credit stays yours.</p>

  <!-- LISTEN -->
  <div class="listen-wrap"><a class="listen" href="/watch.html?ep=04">▶ Listen to this episode</a></div>

  <!-- NEXT -->
  <div class="next">
    <p class="eyebrow">Next week on L<span class="ai">Ai</span>DIES</p>
    <h3>Episode 05 · The Super Models</h3>
    <p>Our heroine opens the AI her company installed… and it answers exactly like the one she uses at home. She learns the difference between the brand on the door and the brains behind it. See you next Wednesday, in SUNNYVAiLE.</p>
  </div>

  <!-- FIELD TRIP -->
  <div class="tryon">
    <p class="eyebrow">Your scene · the field trip</p>
    <h3>Go meet a Maven</h3>
    <p>No try-on task this week. Go up to the LUMINAiRY, walk into the quiet wing, and meet one MAiVEN you'd genuinely never heard of before today. Then text one friend a single sentence about her. It's very hard to feel behind on something the moment you find out it took almost two hundred years and a hundred brilliant women to hand it to you.</p>
    <a class="btn" href="/luminairy.html">Meet the MAiVENS →</a>
  </div>

  <!-- THE VOCAB — key terms + definitions (written-only; each term will link to its full entry in the LIBRAiRY Reference shelf once the glossary is built) -->
  <div class="mark" id="vocab"><div class="k">The four words</div><h2>The Vocab</h2><div class="sub">Key terms and their definitions.</div></div>
  <div class="gloss">
    <details open>
      <summary><span class="term">Algorithm</span><span class="peek">A precise set of steps a machine follows — Ada wrote the first one.</span><span class="plus">+</span></summary>
      <img class="concept-art" src="../assets/episodes/ep-04/pixel/ep04-concept-algorithm-comic-v1-exact-text-1920.png" alt="Algorithm" loading="lazy">
        <p class="def">A precise, repeatable set of steps for solving a problem — the recipe a machine follows, in order, every time. Ada Lovelace wrote the first one in 1843, for a machine that wouldn't be built for another century. Not magic, not thinking: just very careful instructions, followed exactly.</p>
    </details>
    <details>
      <summary><span class="term">Compiler</span><span class="peek">A translator from human-ish words into machine code — Grace Hopper's idea.</span><span class="plus">+</span></summary>
      <img class="concept-art" src="../assets/episodes/ep-04/pixel/ep04-concept-compiler-comic-v1-exact-text-1920.png" alt="Compiler" loading="lazy">
        <p class="def">A translator that turns instructions written in something close to plain language into the raw code a machine actually runs. Grace Hopper built one of the first, so people would stop having to think like the machine and could tell it what they wanted in words. Every app you tap sits on top of that one idea.</p>
    </details>
    <details>
      <summary><span class="term">AI winter</span><span class="peek">A long stretch when the promises outran the results and the money froze.</span><span class="plus">+</span></summary>
      <img class="concept-art" src="../assets/episodes/ep-04/pixel/ep04-concept-ai-winter-comic-v1-exact-text-1920.png" alt="AI winter" loading="lazy">
        <p class="def">One of the long stretches — there were roughly two — when AI's big promises outran what it could actually do, the funding froze, and "artificial intelligence" became a slightly embarrassing thing to say out loud. The work didn't stop; it just went quiet, until the thaw.</p>
    </details>
    <details>
      <summary><span class="term">Training data</span><span class="peek">The mountain of examples a model learns from — Fei-Fei Li's millions of pictures.</span><span class="plus">+</span></summary>
      <img class="concept-art" src="../assets/episodes/ep-04/pixel/ep04-concept-training-data-comic-v1-exact-text-1920.png" alt="Training data" loading="lazy">
        <p class="def">The examples a model learns from — the more it sees, the more it can do. Fei-Fei Li's insight was that the bottleneck was never the machine's "brain"; it was that no one had shown it enough of the world. Her ImageNet — millions of labeled pictures — is why, in 2012, a machine finally learned to see.</p>
    </details>
  </div>

</main>

<!-- CAST -->
<section class="cast"><div class="cast-in">
  <span class="eyebrow">The cast of this episode</span>
  <h2>The M<span class="ai">Ai</span>VENS in "{{EP:title}}"</h2>
  <div class="cast-grid">
    <a class="cast-card" href="/luminairy.html"><span class="cast-portrait-held" aria-hidden="true">Portrait held</span><b>Ada Lovelace</b><span>The first algorithm · 1843</span></a>
    <a class="cast-card" href="/luminairy.html"><span class="cast-portrait-held" aria-hidden="true">Portrait held</span><b>Hedy Lamarr</b><span>The signal · 1942</span></a>
    <a class="cast-card" href="/luminairy.html"><span class="cast-portrait-held" aria-hidden="true">Portrait held</span><b>Grace Hopper</b><span>The compiler · 1952</span></a>
    <a class="cast-card" href="/luminairy.html"><span class="cast-portrait-held" aria-hidden="true">Portrait held</span><b>Karen Spärck Jones</b><span>The finding · 1972</span></a>
    <a class="cast-card" href="/luminairy.html"><span class="cast-portrait-held" aria-hidden="true">Portrait held</span><b>Fei-Fei Li</b><span>The sight · 2012</span></a>
    <a class="cast-card" href="/luminairy.html"><span class="cast-portrait-held" aria-hidden="true">Portrait held</span><b>Joy Buolamwini</b><span>The mirror</span></a>
    <a class="cast-card" href="/luminairy.html"><span class="cast-portrait-held" aria-hidden="true">Portrait held</span><b>Timnit Gebru</b><span>The room</span></a>
    <a class="cast-card" href="/luminairy.html"><span class="cast-portrait-held" aria-hidden="true">Portrait held</span><b>Kate Crawford</b><span>The map</span></a>
  </div>
</div></section>

<!-- IN MEMORIAM — Alan Turing · sits under the cast of MAiVENS -->
<div style="padding:0 24px">
  <div class="memoriam">
    <div class="mem-k">✦&nbsp;&nbsp;In memoriam&nbsp;&nbsp;✦</div>
    <h3>Alan Turing<span>1912–1954</span></h3>
    <p>This story is the women's. But it rests on a foundation, and one of its architects was Alan Turing — who imagined the machine itself, and the test we still use to ask whether it thinks. In 1952, the country he had helped save prosecuted him for being gay and chemically castrated him — the price of staying out of prison. He was dead within two years; it took Britain half a century to apologize. He is not a M<span class="ai">Ai</span>VEN — he is the reason so many of them had a machine to build on, and a reminder that brilliance has been erased here for <em>who you love</em> as much as <em>what you are</em>. We keep his name lit, too.</p>
  </div>
</div>

<!-- RAIL -->
<div class="rail">
  <span class="eyebrow">Everything in this episode</span>
  <div class="rail-row">
    <a class="rail-btn rb1" href="/watch.html?ep=04">Listen<small>Narration</small></a>
    <a class="rail-btn rb2" href="/blend-snap.html#the-study-pack">Study Pack<small>Availability checked at the café</small></a>
    <a class="rail-btn rb4" href="/radio.html">The Song<small>It Was Women All Along</small></a>
    <a class="rail-btn rb6" href="/bronze-aige.html#cocktail-ep04">Cocktail<small>What IS it, actually?</small></a>
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
})();
</script>
</body>
</html>
```

## Narration
```text
# — EPISODE 4 · THE FOUNDING MOTHERS — multi-voice recording script (this header line is NOT recorded) —
# Switch voice at each speaker tag. Lowercase [tags] like [dry] / [warm] are ElevenLabs delivery cues, NOT voice switches.
#   [tv announcer]       = the 90s TV announcer (previously / next time)
#   [host]               = Jessica — the show host, main narrator, most of the episode + all living Mavens
#   [ada lovelace]       = British, refined upper-class English (RP)
#   [hedy lamarr]        = Austrian / Viennese, glamorous European
#   [grace hopper]       = American, crisp and brisk (Navy officer)
#   [karen sparck jones] = British, dry and precise (Cambridge)

[tv announcer] Previously, on ladies: our heroine got a gorgeous, confident answer from the machine — and caught the one quiet line in it that was completely, confidently wrong. She learned that before her name goes on anything, she checks it like Elle Woods. [playful] And on this episode: three weeks in, she realizes she's been talking to this thing every single day... and has no idea where it came from, or what it even is. So she goes looking for the origin story — and finds out it was women all along. This is Episode Four: {{EP:title}}.

[host] It's a slow Wednesday, and I'm mid-sentence with the machine — asking it something, correcting it, the whole married-couple energy we've got going now — when it hits me, and I actually stop typing. [dry] I have been talking to this thing every day for three weeks. I've briefed it, argued with it, caught it lying to my face. [flat] And I could not tell you the first thing about where it came from. What it even is. Who made it. [thoughtful] It's like I moved in with someone and realized I'd never once asked to meet their family. [beat] And I couldn't help but wonder... this thing that showed up and rearranged my whole workweek — is it actually new? And the question underneath that one, the one I almost didn't let myself ask: who built it?

[host] [warm] Welcome back to ladies — smart, busy women learning AI one Wednesday at a time, from a little internet town called Sunnyvale. Three weeks ago you stopped feeling behind. Then you learned to brief it like a new hire. Last week, to fact-check it like a lawyer. [dry] So you can genuinely use the thing now. But I'd learned to drive the car without ever once asking who built the engine. [pointed] So this week, no new trick. This week's a flashback. [dry] It actually started with a coworker saying it. "Just use AI for that." [flat] As if "AI" were a complete instruction — and not an entire mall directory of tools all wearing the same name tag. Which AI? ChatGPT? Claude? The one my company announced in a town hall that nobody can even find? [measured] Because "just use AI" isn't really an instruction. "AI" is the name of a whole field. It's like being told to "just use internet." [flat] ...Use internet for what? [warm] With the internet, you already know which part does what — you don't even think about it. With AI, nobody has handed you that map yet. [dry] And the coworker who told me to "just use it"? She couldn't have told me either. [pointed] But before I could even get to which part does what, I got stuck on a much more basic question. So this week: what is this thing — really — and how did it get all the way to your desk.

[host] [warm] And for that, I went up the hill, to the LUMINAiRY — Sunnyvale's hall of heroes. Everybody knows the front room: the patron saints, the Chers and the Elles. [warm] But there's a quieter wing in the back I'd never once walked into. No movie stars in there. [dry] ...Well. Almost no movie stars. [warm] Just the women who actually built the thing this whole town is about. They call them the MAiVENS. [smirk] And if you sit down in that wing and ask "so, how did we get here," they will tell you the entire story. [warm] The lights go soft. Somewhere, a harp. Stay with me — we're going back.

[host] [measured] It starts in the eighteen-forties. [warm] With a young woman staring at a giant mechanical calculator — a machine that could do exactly one thing: crunch numbers. [dry] Let her tell you what she saw.

[ada lovelace] They built it to do arithmetic. And everyone who looked at it saw... arithmetic. A very expensive adding machine. [warm] I looked at it and saw something else entirely. Because I understood: if a machine can follow instructions, and you can write those instructions down precisely enough, then numbers are only the beginning. It could work with symbols. It could set them to music. It could make things no one had made before. [measured] So I wrote the instructions down — a method, step by step, for the machine to follow. The first of its kind. [dry] Though — mind you — I also said plainly: it has no pretensions to originate anything. It only ever does what we know how to order it to do. [pointed] Remember that part. Everyone forgets that part.

[host] [dry] That's Ada Lovelace. Eighteen forty-three — before the lightbulb. She wrote the first algorithm for a machine that wouldn't be built for another century, and in the same breath told us exactly what it could and couldn't be. [warm] And for the next hundred years, they handed the credit to the man whose machine it was — and quietly decided a woman couldn't possibly have done the math.

[host] [warm] Now jump ahead a century, to nineteen forty-two. And this next one — you already know her face. She was billed, at the time, as the most beautiful woman in the world. Movie star. Bombshell. [dry] And between takes, she was inventing.

[hedy lamarr] Everyone assumed there was nothing behind the face. [dry] It is a very useful thing, to be underestimated — no one watches what you're actually doing. [measured] There was a war on, and the radio-controlled torpedoes kept getting jammed — the signal was too easy to find and block. So a friend and I designed a system that hops: the signal leaps from frequency to frequency, dozens of them, too fast to catch — and the receiver hops right along with it, in step. [pointed] You cannot jam a signal you cannot find.

[host] [warm] Hedy Lamarr — with the composer George Antheil. The Navy said no — too bulky, they said — and shelved it. [dry] But that idea, a signal hopping to stay hidden, is in the family tree of the whole wireless world you're standing in: the Wi-Fi, the Bluetooth, the invisible hum that carries everything to everywhere. [pointed] She never made a dime from it, and no one called her an inventor until she was nearly gone. [smirk] The most beautiful woman in the world — and nobody heard a single word she said.

[host] [warm] And three years later — nineteen forty-five — with the war still on, the Army in Philadelphia switches on one of the first true electronic computers: a thirty-ton, room-sized machine called the ENIAC, built to calculate artillery tables. [dry] But a machine that new doesn't come with instructions. Somebody has to teach it, physically, what to do. [warm] And the Army hands that job — the part they figure is the tedious part — to six women. Jean, Betty, Kay, Marlyn, Ruth, and Frances. [measured] With no manual and no programming language to write in — because one did not exist yet — they program the thing by hand: rewiring it, cable by cable, switch by switch, working out how to make a machine follow a plan at all. [pointed] They are, quite literally, the first programmers. [dry] And when the ENIAC is shown to the press, the men in the photographs get named. The six women — standing right there, at the machine they programmed — do not. For decades, people who saw those pictures simply assumed they were models, posed to make the equipment look good. [flat] It took about forty years for anyone to go back and learn who they actually were. [warm] But that reckoning comes much later. [dry] For now — the machines are about to leap ahead, and they bring a brand-new headache with them.

[host] [warm] Nineteen fifty-two. The machines are real now — but talking to one is agony. You had to write in raw code, the machine's own language, every instruction by hand. [measured] Enter a mathematician the Navy almost didn't take — too old, they said, at thirty-six. Too small. [dry] They took her anyway. Thank goodness.

[grace hopper] They kept telling me a computer could only handle numbers — that it could never understand words. [dry] I found that a failure of imagination. [measured] Why should a person have to learn to think like a machine? Backwards, the whole thing. So I built a translator — a compiler. You write what you want in something close to plain English, and it does the converting into code for you. [pointed] I taught the machine to meet us halfway. Every app you tap, every chatbot you open, sits on top of that one idea.

[host] [warm] Grace Hopper. She'd make Rear Admiral; they named a warship after her. [dry] And once, when an actual moth flew into the machine and jammed it, her team taped the thing into the logbook — "first actual case of a bug being found." [smirk] That is where "debugging" comes from. She kept the logbook.

[host] [dry] And it's right here — nineteen fifty-six — that the men finally show up and give it a name. A handful of them get a room at Dartmouth for the summer, write up a proposal, and christen the whole dream: "artificial intelligence." [dry] Names on it as the founding fathers. And then they promise the world it'll be basically solved... by the end of the summer. [flat] It was not solved by the end of the summer. [dry] It wasn't solved for decades. The funding dried up, the promises curdled, and "AI" became a slightly embarrassing thing to say out loud. They call those the AI winters. Roughly two of them. It got cold more than once.

[host] [warm] But even in the cold, the work didn't stop. Nineteen seventy-two — a woman at Cambridge cracks a problem that sounds tiny and turns out to be enormous: how does a machine find the right thing?

[karen sparck jones] Hand a machine a mountain of documents and ask it to find what matters, and here is the trick: the common words tell you nothing. "The." "And." "Is." Useless. [measured] It's the rare words that carry the meaning. So I built a way to weigh them — to let the machine value the word that's unusual over the word that's everywhere. [pointed] It is the arithmetic underneath every search box you have ever typed into. And underneath the modern ones, too — the systems that go and look things up before they dare to answer you.

[host] [warm] Karen Spärck Jones. [dry] She spent most of her career on short contracts — no permanent post until nineteen ninety-three, which she said plainly was because she was a woman. Usually the only one in the room. [pointed] And she had a line she liked to repeat, that I want carved over the door of this entire episode:

[karen sparck jones] Computing is too important to be left to men.

[host] [smirk] ...Write that one down.

[host] [warm] And then — decades later, after almost everyone had given up — the thaw. It comes from a professor at Stanford named Fei-Fei Li, and it comes from a heretical idea. [measured] Everyone was busy trying to build a smarter brain. She said the brain was never the problem — the problem was we'd never given it enough to look at. [warm] She'd come to this country at sixteen, barely speaking English, working weekends in her family's dry-cleaning shop. And she builds the thing everyone told her was far too big to bother with: a collection of millions upon millions of labeled images, so a machine could finally learn what the world actually looks like. [pointed] And in twenty-twelve, a program trained on her pictures suddenly sees — recognizes images better than anything before it, by a landslide. [knowing] That is the spark. That "AI boom" people won't stop talking about starts right there, with her data. [dry] The world took to calling her the Godmother of AI. [smirk] Godmother. Not godfather.

[host] [warm] And after that, it moves fast. [measured] Twenty-seventeen, a team at Google publishes a new design that finally cracks how a machine handles language — and for the first time, the thing can really write. And then, one perfectly ordinary Wednesday — November, twenty-twenty-two — someone wraps all of it in a little chat box, puts it online for free, and calls it ChatGPT. [pointed] By one widely-cited estimate, a hundred million people were using it within about two months — the fastest anything had ever caught on. [dry] That's the day AI stopped being a lab thing and became a you thing. The day it landed on your desk — the very desk you were sitting at three weeks ago, feeling behind.

[host] [knowing] But here's the part the highlight reel skips. [warm] As it got powerful, another set of women got loud — on purpose. [measured] Joy Buolamwini, a grad student at MIT, goes to use face-detection software... and it can't see her. Her dark skin. Not until she literally holds up a white mask. So she proves it: tests the big commercial systems and shows they fail hardest of all on darker-skinned women. [warm] Timnit Gebru — whose own doctoral advisor was Fei-Fei Li — teamed up with a linguist, Emily Bender, to warn that these language machines can sound brilliant while understanding nothing, and to name what that costs. [measured] Bender gave the problem a name that stuck: a stochastic parrot — a bird that mimics speech perfectly, with not the faintest idea what it's saying. [dry] Gebru raised it inside Google, and in twenty-twenty she was abruptly gone — she says she was fired; Google says it accepted a resignation. What is not in dispute: thousands of her colleagues signed their names in protest. [warm] And Kate Crawford maps the part nobody wants to look at — that behind the "magic" is a supply chain of mines, water, electricity, and underpaid human hands. Her line: AI is neither artificial nor intelligent. [pointed] These are not the buzzkills at the party. They are the reason the thing you're about to trust is worth trusting. [dry] Last week you learned to check the machine. These are the women who check the whole machine.

[host] [warm] And then the lights come up, and it's just me, in the back of the LUMINAiRY, holding all of it. [measured] Almost two hundred years. A room full of women, most of whom had to fight to be believed. One very confident chatbot. [pointed] And THAT is what's been sitting quietly in your browser tab this whole time. Not magic. Not born last Tuesday. [dry] The newest chapter, the one still being written this very minute: agentic AI — the kind that doesn't just answer you, it goes and does the thing. That's the edge of the map right now.

[host] [deliberate] So — the cocktail-party version, for when someone at happy hour asks, "is this whole AI thing brand new, or what?" [dry] It's almost two hundred years old and about three years old at the same time. The science has been building for centuries, your access to it is brand new. [warm] And every real leap in it — the idea, the signal, the language, the finding, the sight — has a woman's name on it. Whether or not the textbook bothered to write it down.

[host] [warm] And that's the episode. [dry] No try-on task this week — a field trip. Everything you need lives at ladies dot A I. That's "ladies" with an i in the middle: L, A, i, D, I, E, S. And if you'd rather read than listen, the whole story's written up there too — every name and date where you can check it yourself. [warm] And here's the thing — I only had time to introduce you to a handful of Mavens. The wing is full of them, more women than any one episode could ever hold. So your assignment: go up to the LUMINAiRY, meet one Maven I didn't even name today, and text one friend a single sentence about her. [smile] Because it's very hard to feel behind on something the moment you find out it took almost two hundred years and a hundred brilliant women to hand it to you.

[host] [warm] Then, if you're feeling it: grab this week's study pack at the Blend and Snap, take the pop quiz at Sunnyvale High — banking butterfly clips in your closet — and turn on K-S-V-L, ninety-nine point nine, for this week's anthem. And if this is your first Wednesday with us, stop by Makeover on Main for your residence card. Two minutes, free, and everything you collect starts counting.

[host] [warm] So remember, ladies: you were never behind on AI. [pointed] You were just never told it was yours — built by women, for almost two hundred years, until it finally knocked on your door. [smirk] Computing is too important to be left to men. [warm, smiling] See you next Wednesday... in Sunnyvale.

[tv announcer] Next time on ladies: our heroine opens the AI her company installed... and it answers exactly like the one she uses at home. She learns the difference between the brand on the door and the brains behind it — and why "which AI is best" was the wrong question all along. Come back next week for Episode Five: The Super Models.
```
