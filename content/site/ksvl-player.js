/**
 * KSVL Mix CDs Player
 *
 * Renders a rack of burned CD-Rs on any page.
 * Mount by adding <div id="ksvl-mix-cds"></div>, then include this script.
 *
 * Six mixes: All Songs · Anthems · PATRON SAiNTS · Activities · Episodes · B-side
 *
 * Each CD is a Sharpie-labeled jewel case. Click to start the mix; player
 * bar at the bottom of the viewport shows now-playing + controls. Tracks
 * auto-advance through the mix and loop back to top when done.
 *
 * When Ali records new tracks, drop them into content/music/ and add an
 * entry to TRACKS below with the right mix tag.
 */
(function() {
  'use strict';

  var MUSIC = '/content/music/';
  var SAINT_INTROS = '/content/music/ksvl-transitions/';

  // ---- Track library (single source of truth) ----
  // The `intro` field, when present, points to a DJ SunnyV recorded intro that
  // plays right before the track (in mix queues + live rotation + play-all).
  var TRACKS = [
    // Anthems
    { id: 'town-anthem',           title: 'Welcome to SUNNYVAiLE',                 artist: 'THE LAiDIES',   src: MUSIC + 'sunnyvaile-town-anthem.mp3',                         mixes: ['anthems'] },
    { id: 'wednesdays-in-sv',      title: 'Wednesdays in SUNNYVAiLE',              artist: 'THE LAiDIES',   src: MUSIC + 'the-laidies-wednesday-in-sunnyvaile.mp3',           mixes: ['anthems'] },

    // PATRON SAiNTS
    { id: 'saint-buffy',           title: 'Buffy · PATRON SAiNT of SLAiYING',                 artist: 'The Overfits',    src: MUSIC + 'saint-buffy-summers.mp3',      intro: SAINT_INTROS + 'dj-sunnyv-intro-saint-buffy-summers.mp3',    mixes: ['saints'] },
    { id: 'saint-cher',            title: 'Cher · PATRON SAiNT of Early Adoption',            artist: 'The Overfits',    src: MUSIC + 'saint-cher-horowitz.mp3',      intro: SAINT_INTROS + 'dj-sunnyv-intro-saint-cher-horowitz.mp3',    mixes: ['saints'] },
    { id: 'saint-david',           title: 'David Rose · PATRON SAiNT of Specificity',         artist: 'Chain of Thought', src: MUSIC + 'saint-david-rose.mp3',         intro: SAINT_INTROS + 'dj-sunnyv-intro-saint-david-rose.mp3',       mixes: ['saints'] },
    { id: 'saint-deb',             title: 'Deb · PATRON SAiNT of Loop Me Out',                artist: 'Latent Space',    src: MUSIC + 'saint-deb.mp3',                intro: SAINT_INTROS + 'dj-sunnyv-intro-saint-deb.mp3',              mixes: ['saints'] },
    { id: 'saint-dolly',           title: 'Dolly Parton · PATRON SAiNT of Common Sense',      artist: "Grand Ol' Query", src: MUSIC + 'saint-dolly-parton.mp3',       intro: SAINT_INTROS + 'dj-sunnyv-intro-saint-dolly-parton.mp3',     mixes: ['saints'] },
    { id: 'saint-elle',            title: 'Elle Woods · PATRON SAiNT of Receipts',            artist: 'The Regressions', src: MUSIC + 'saint-elle-woods.mp3',         intro: SAINT_INTROS + 'dj-sunnyv-intro-saint-elle-woods.mp3',       mixes: ['saints'] },
    { id: 'saint-miranda',         title: 'Miranda · PATRON SAiNT of Standards',              artist: 'Latent Space',    src: MUSIC + 'saint-miranda-priestly.mp3',   intro: SAINT_INTROS + 'dj-sunnyv-intro-saint-miranda-priestly.mp3', mixes: ['saints'] },
    { id: 'saint-regina',          title: 'Regina · PATRON SAiNT of Dangerous Confidence',    artist: 'The Embeddings',  src: MUSIC + 'saint-regina-george.mp3',      intro: SAINT_INTROS + 'dj-sunnyv-intro-saint-regina-george.mp3',    mixes: ['saints'] },

    // Activities
    { id: 'ask-laidy',             title: 'Ask LAiDY',                             artist: 'DJ SunnyV',       src: MUSIC + 'game-ask-laidy.mp3',                                 mixes: ['activities'] },
    { id: 'businesswomens',        title: "Businesswomen's Special",               artist: 'The Embeddings',  src: MUSIC + 'game-businesswomens-special.mp3',                    mixes: ['activities'] },
    { id: 'dream-phone',           title: 'Dream Phone',                           artist: 'The Bots',        src: MUSIC + 'game-dream-phone.mp3',                               mixes: ['activities'] },
    { id: 'girl-talk',             title: 'Girl Talk',                             artist: 'The Regressions', src: MUSIC + 'game-girl-talk.mp3',                                 mixes: ['activities'] },
    { id: 'mme-claio',             title: "Mme CLAi-O's Shop",                     artist: 'The Predicts',    src: MUSIC + 'game-mme-claio.mp3',                                 mixes: ['activities'] },
    { id: 'blend-and-snap',        title: 'Down at the Blend & Snap',              artist: 'The Recalls',     src: MUSIC + 'the-laidies-down-at-the-blend-and-snap.mp3',         mixes: ['activities'] },
    { id: 'the-library',           title: 'Welcome to the LIBRAiRY',               artist: 'The Bots',        src: MUSIC + 'dj-jaidy-week-04-the-library.mp3',                     mixes: ['activities'] },

    // Episodes
    { id: 'ep-01',                 title: 'Ep 01 · On Wednesdays We Do AI',                       artist: 'The Regressions', src: MUSIC + 'dj-jaidy-week-01-on-wednesday-we-do-ai.mp3',           intro: SAINT_INTROS + 'dj-sunnyv-intro-episode-01.mp3', mixes: ['episodes'] },
    { id: 'ep-02',                 title: 'Ep 02 · Tell Me What You Want',                        artist: 'The Predicts',    src: MUSIC + 'dj-jaidy-week-02-tell-me-what-you-want.mp3',           intro: SAINT_INTROS + 'dj-sunnyv-intro-episode-02.mp3', mixes: ['episodes'] },
    { id: 'ep-03',                 title: "Ep 03 · Don't Be Chutney on the Stand",                artist: 'The Overfits',    src: MUSIC + 'dj-jaidy-week-03-dont-be-chutney-on-the-stand.mp3',    intro: SAINT_INTROS + 'dj-sunnyv-intro-episode-03.mp3', mixes: ['episodes'] },
    { id: 'every-slaiyer-watcher', title: 'Every SLAiYER Needs a Watcher',                        artist: 'The Embeddings',  src: MUSIC + 'dj-jaidy-every-slaiyer-needs-a-watcher.mp3',           intro: SAINT_INTROS + 'dj-sunnyv-intro-episode-04.mp3', mixes: ['episodes'] },

    // B-side
    { id: 'impossible',            title: 'Impossible to Underestimate You',                    artist: 'The Overfits',   src: MUSIC + 'dj-jaidy-impossible-to-underestimate-you.mp3',        mixes: ['bside'] },
    { id: 'debs-tomorrow',         title: "Deb's Tomorrow Problem",                              artist: 'The Overfits',   src: MUSIC + 'debs-tomorrow-problem.mp3',                            mixes: ['bside'] }
  ];

  // ---- Mix definitions (order matters — display order in the rack) ----
  var CD_IMG_DIR = '/assets/brand/';
  var MIXES = [
    { id: 'all',        title: 'All Songs',     sub: 'Everything KSVL has',                     color: 'plum',   labelStyle: 'sharpie', image: CD_IMG_DIR + 'ksvl-cd-mini-pearl-plum.png' },
    { id: 'anthems',    title: 'Anthems',       sub: 'The town identity tracks',                color: 'gold',   labelStyle: 'sharpie', image: CD_IMG_DIR + 'ksvl-cd-mini-champagne-lime.png' },
    { id: 'saints',     title: 'PATRON SAiNTS', sub: 'One track per saint',                     color: 'rose',   labelStyle: 'sharpie', image: CD_IMG_DIR + 'ksvl-cd-mini-blush-pink.png' },
    { id: 'activities', title: 'Activities',    sub: 'Game themes + hangouts',                  color: 'teal',   labelStyle: 'sharpie', image: CD_IMG_DIR + 'ksvl-cd-mini-teal-mint.png' },
    { id: 'episodes',   title: 'Episodes',      sub: 'DJ SunnyV intros, one per issue',         color: 'purple', labelStyle: 'sharpie', image: CD_IMG_DIR + 'ksvl-cd-mini-lavender-pop.png' },
    { id: 'bside',      title: 'B-side',        sub: "Bonus tracks that don't fit elsewhere",   color: 'aqua',   labelStyle: 'sharpie', image: CD_IMG_DIR + 'ksvl-cd-mini-aqua-blue.png' }
  ];

  function tracksForMix(mixId) {
    if (mixId === 'all') return TRACKS.slice();
    return TRACKS.filter(function(t) { return t.mixes.indexOf(mixId) >= 0; });
  }

  // Wrap a track with its DJ SunnyV intro so they play as one atomic queue item
  // (intro → track). Tracks without an `intro` field pass through unchanged.
  function wrapWithIntro(track) {
    if (!track || !track.intro) return track;
    return {
      title: track.title,
      artist: track.artist,
      parts: [
        { src: track.intro, title: 'DJ SunnyV introduces… ' + track.title, artist: 'DJ SunnyV' },
        { src: track.src,   title: track.title, artist: track.artist }
      ]
    };
  }

  // ---- LIVE rotation assets ----
  var LIVE_MIX = { id: 'live', title: 'KSVL Live', sub: 'The full broadcast · new today', color: 'gold', labelStyle: 'sharpie' };

  var JINGLES_DIR = '/content/music/ksvl-jingles/';
  var TRANSITIONS_DIR = '/content/music/ksvl-transitions/';
  var SPOTS_DIR = '/content/music/ksvl-spots/';
  var INTROS_DIR = '/content/music/ksvl-spots/intros/';

  // Standalone jingles — station bumpers that play on their own between tracks.
  // (Station ID is used only as the opener; Signoff is used only when a mix wraps.)
  var LIVE_JINGLES = [
    { title: 'KSVL Wednesday', src: JINGLES_DIR + 'jingle-ksvl-wednesday.mp3' },
    { title: 'KSVL Sting',     src: JINGLES_DIR + 'jingle-ksvl-sting-a.mp3' },
    { title: 'KSVL Sting',     src: JINGLES_DIR + 'jingle-ksvl-sting-b.mp3' }
  ];

  // DJ segments. Weather and Traffic are PAIRED with a jingle bumper — they play as a single atomic
  // unit (jingle bumper → DJ report) so the traffic report can never happen without the traffic jingle.
  // DJ Signoff is intentionally NOT in the rotation pool — it only plays when the user hits Stop.
  var LIVE_TRANSITIONS = [
    { title: 'DJ SunnyV · Signature Open', artist: 'KSVL', src: TRANSITIONS_DIR + 'dj-sunnyv-signature-open.mp3' },
    { title: 'DJ SunnyV · Time-Check',     artist: 'KSVL', src: TRANSITIONS_DIR + 'dj-jaidy-time-check.mp3' },
    { title: 'DJ SunnyV · On the Air',     artist: 'KSVL', src: TRANSITIONS_DIR + 'dj-sunnyv-general.mp3' },
    { title: 'DJ SunnyV · Between Tracks', artist: 'KSVL', src: TRANSITIONS_DIR + 'dj-sunnyv-general-2.mp3' },
    { title: 'DJ SunnyV · Call in a Request', artist: 'KSVL', src: TRANSITIONS_DIR + 'dj-sunnyv-request.mp3' },
    { title: 'SUNNYVAiLE Weather', artist: 'KSVL', parts: [
      { src: JINGLES_DIR + 'jingle-ksvl-weather-a.mp3', title: 'KSVL Weather', artist: 'KSVL' },
      { src: TRANSITIONS_DIR + 'dj-jaidy-weather.mp3',  title: 'SUNNYVAiLE Weather Report', artist: 'DJ SunnyV' }
    ]},
    { title: 'SUNNYVAiLE Weather', artist: 'KSVL', parts: [
      { src: JINGLES_DIR + 'jingle-ksvl-weather-b.mp3', title: 'KSVL Weather', artist: 'KSVL' },
      { src: TRANSITIONS_DIR + 'dj-jaidy-weather.mp3',  title: 'SUNNYVAiLE Weather Report', artist: 'DJ SunnyV' }
    ]},
    { title: 'SUNNYVAiLE Traffic', artist: 'KSVL', parts: [
      { src: JINGLES_DIR + 'jingle-ksvl-traffic.mp3',        title: 'KSVL Traffic', artist: 'KSVL' },
      { src: TRANSITIONS_DIR + 'dj-jaidy-traffic-report.mp3', title: 'SUNNYVAiLE Traffic Report', artist: 'DJ SunnyV' }
    ]}
  ];

  var LIVE_COMMERCIALS = [
    { store: 'Mayor Deb',              intro: INTROS_DIR + 'intro-deb-psa.mp3',           spot: SPOTS_DIR + 'spot-deb-psa.mp3' },
    { store: 'The Blend & Snap',       intro: INTROS_DIR + 'intro-blend-and-snap.mp3',    spot: SPOTS_DIR + 'spot-blend-and-snap-v2.mp3' },
    { store: 'The BRONZE AiGE',        intro: INTROS_DIR + 'intro-bronze-aige.mp3',       spot: SPOTS_DIR + 'spot-bronze-aige-v2.mp3' },
    { store: 'Mme CLAi-O',             intro: INTROS_DIR + 'intro-mme-claio.mp3',         spot: SPOTS_DIR + 'spot-mme-claio-v2.mp3' },
    { store: 'The LUMINAiRY',         intro: INTROS_DIR + 'intro-luminairy.mp3',        spot: SPOTS_DIR + 'spot-luminairy.mp3' },
    { store: 'The Post Office',        intro: INTROS_DIR + 'intro-post-office.mp3',       spot: SPOTS_DIR + 'spot-post-office.mp3' },
    { store: 'Delta LAi Nu',           intro: INTROS_DIR + 'intro-delta-lai-nu.mp3',      spot: SPOTS_DIR + 'spot-delta-lai-nu.mp3' },
    { store: 'The Mall',               intro: INTROS_DIR + 'intro-mall-claires.mp3',      spot: SPOTS_DIR + 'spot-mall-pieces-of-flair-v2.mp3' },
    { store: 'SUNNYVAiLE High',        intro: INTROS_DIR + 'intro-sunnyvaile-high.mp3',   spot: SPOTS_DIR + 'spot-sunnyvaile-high-v2.mp3' },
    { store: 'The Chick Flicks',       intro: INTROS_DIR + 'intro-chick-flicks.mp3',      spot: SPOTS_DIR + 'spot-chick-flicks-v2.mp3' },
    { store: 'The FAiRY Godmother',    intro: INTROS_DIR + 'intro-fairy-godmother.mp3',   spot: SPOTS_DIR + 'spot-fairy-godmother.mp3' }
  ];

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  // Builds a rotation queue. Always opens with the KSVL station-ID jingle,
  // then rotates blocks of: song → jingle → song → transition → song → commercial (intro+spot as one atomic unit).
  function buildLiveQueue() {
    var songs = shuffle(TRACKS);
    var jingles = shuffle(LIVE_JINGLES);
    var transitions = shuffle(LIVE_TRANSITIONS);
    var commercials = shuffle(LIVE_COMMERCIALS);
    var queue = [stationOpener()];
    var si = 0, ji = 0, ti = 0, ci = 0;
    // 8 blocks; nextTrack() wraps via modulo so it loops indefinitely.
    for (var b = 0; b < 8; b++) {
      queue.push(wrapWithIntro(songs[si++ % songs.length]));
      var jg = jingles[ji++ % jingles.length];
      queue.push({ title: jg.title, artist: 'KSVL', src: jg.src });
      queue.push(wrapWithIntro(songs[si++ % songs.length]));
      // Transition may be a single track OR a paired jingle+report atomic unit.
      queue.push(transitions[ti++ % transitions.length]);
      queue.push(wrapWithIntro(songs[si++ % songs.length]));
      var com = commercials[ci++ % commercials.length];
      queue.push({
        title: com.store,
        artist: 'KSVL Sponsors',
        parts: [
          { src: com.intro, title: 'And now, a word from ' + com.store + '…', artist: 'DJ SunnyV' },
          { src: com.spot,  title: com.store,                                artist: 'KSVL Sponsors' }
        ]
      });
    }
    return queue;
  }

  function startLive() {
    state.mixId = 'live';
    state.queue = buildLiveQueue();
    playIndex(0);
  }
  window.KSVL_startLive = startLive;

  // ---- CSS ----
  var STYLE = ''
    + '.ksvl-mix-rack { margin: 40px 0; }'
    + '.ksvl-mix-eyebrow { font-family: "Jost", sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase; color: var(--rose, #9b3f5f); margin-bottom: 8px; }'
    + '.ksvl-mix-title { font-family: "Playfair Display", Georgia, serif; font-size: clamp(24px, 3vw, 32px); font-weight: 700; color: var(--plum, #4b2148); margin: 0 0 6px; line-height: 1.15; }'
    + '.ksvl-mix-lede { font-size: 15px; color: var(--plum, #4b2148); margin: 0 0 22px; font-style: italic; }'
    + '.ksvl-mix-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; }'
    + '.ksvl-cd { background: transparent; border: none; padding: 0; cursor: pointer; text-align: left; font-family: inherit; color: inherit; transition: transform 0.15s ease; }'
    + '.ksvl-cd:hover { transform: translateY(-4px); }'
    + '.ksvl-cd:focus { outline: none; }'
    + '.ksvl-cd:focus .ksvl-cd-jewel { box-shadow: 0 0 0 3px var(--rose, #9b3f5f), 0 8px 20px rgba(75,33,72,0.28); }'
    + '.ksvl-cd-jewel { position: relative; aspect-ratio: 1 / 1; background: linear-gradient(135deg, rgba(255,253,251,0.98) 0%, rgba(250,242,246,0.98) 100%); border: 1px solid rgba(75,33,72,0.08); border-radius: 6px; box-shadow: 0 2px 6px rgba(75,33,72,0.08), 0 10px 24px rgba(75,33,72,0.14); overflow: hidden; padding: 14px; transition: box-shadow 0.24s ease, transform 0.24s ease; }'
    + '.ksvl-cd:hover .ksvl-cd-jewel { box-shadow: 0 4px 12px rgba(75,33,72,0.14), 0 16px 36px rgba(75,33,72,0.22); }'
    + '.ksvl-cd-jewel::before { content: ""; position: absolute; inset: 0; background: repeating-linear-gradient(115deg, transparent 0 20px, rgba(255,255,255,0.35) 20px 22px); pointer-events: none; opacity: 0.4; z-index: 2; }'
    + '.ksvl-cd-image { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; padding: 8px; box-sizing: border-box; }'
    + '.ksvl-cd-disc { position: absolute; inset: 0; margin: auto; width: 88%; height: 88%; border-radius: 50%; background: radial-gradient(circle at 30% 30%, #f8eef2, #d8bfd0 45%, #a8779a 75%, #6b3a66); box-shadow: inset 0 0 6px rgba(0,0,0,0.15); }'
    + '.ksvl-cd-disc::after { content: ""; position: absolute; inset: 0; margin: auto; width: 22%; height: 22%; border-radius: 50%; background: var(--cream, #fffdfb); box-shadow: inset 0 0 3px rgba(75,33,72,0.4); border: 2px solid rgba(75,33,72,0.15); }'
    + '.ksvl-cd-sharpie { position: absolute; top: 18px; left: 18px; right: 18px; font-family: "Marker Felt", "Comic Sans MS", cursive; font-size: 18px; font-weight: 700; color: #221; transform: rotate(-4deg); text-shadow: 0 1px 0 rgba(255,255,255,0.5); line-height: 1.05; z-index: 2; }'
    + '.ksvl-cd-sharpie--track-count { font-family: "Jost", sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #442244; margin-top: 8px; transform: rotate(2deg); opacity: 0.7; }'
    + '.ksvl-cd-caption { padding: 14px 4px 0; display: flex; flex-direction: column; gap: 8px; }'
    + '.ksvl-cd-caption-title { font-family: "Playfair Display", Georgia, serif; font-size: 17px; font-weight: 700; color: var(--plum, #4b2148); margin: 0; line-height: 1.1; }'
    + '.ksvl-cd-caption-sub { font-size: 12px; color: var(--plum-soft, #6b3a66); margin: 0; font-style: italic; line-height: 1.35; }'
    + '.ksvl-cd-tracklist { list-style: none; margin: 0; padding: 8px 0 0; border-top: 1px dashed rgba(75,33,72,0.18); font-family: "Jost", sans-serif; font-size: 11px; line-height: 1.55; color: var(--plum, #4b2148); }'
    + '.ksvl-cd-tracklist li { padding: 1px 0; }'
    + '.ksvl-cd-track { display: flex; align-items: center; gap: 6px; width: 100%; background: transparent; border: 0; padding: 3px 2px; font: inherit; font-size: 11px; color: var(--plum, #4b2148); text-align: left; cursor: pointer; border-radius: 4px; transition: background 0.12s ease, color 0.12s ease; }'
    + '.ksvl-cd-track:hover { background: rgba(155,63,95,0.10); color: var(--rose, #9b3f5f); }'
    + '.ksvl-cd-track:focus-visible { outline: 2px solid var(--rose, #9b3f5f); outline-offset: 1px; }'
    + '.ksvl-cd-track-icon { flex-shrink: 0; width: 14px; height: 14px; border-radius: 999px; background: var(--gold, #c9a227); color: #fffdfb; display: inline-flex; align-items: center; justify-content: center; font-size: 8px; font-weight: 800; line-height: 1; }'
    + '.ksvl-cd-track:hover .ksvl-cd-track-icon { background: var(--rose, #9b3f5f); }'
    + '.ksvl-cd-track-title { flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }'
    + '.ksvl-cd-tracklist--truncated::after { content: "+ " attr(data-more) " more"; display: block; padding: 4px 0 0 20px; font-size: 10px; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; color: var(--rose, #9b3f5f); }'
    + '.ksvl-cd.is-playing .ksvl-cd-jewel { box-shadow: 0 0 0 3px var(--gold, #c9a227), 0 3px 10px rgba(75,33,72,0.20), 0 12px 28px rgba(75,33,72,0.20); }'
    + '.ksvl-cd.is-playing .ksvl-cd-disc { animation: ksvl-spin 5s linear infinite; }'
    + '@keyframes ksvl-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }'
    /* Flip mechanic */
    + '.ksvl-cd-flip { position: relative; aspect-ratio: 1 / 1; perspective: 1400px; cursor: pointer; background: transparent; border: 0; padding: 0; width: 100%; }'
    + '.ksvl-cd-flip:focus-visible { outline: none; }'
    + '.ksvl-cd-flip:focus-visible .ksvl-cd-face--front { box-shadow: 0 0 0 3px var(--rose, #9b3f5f), 0 8px 20px rgba(75,33,72,0.28); }'
    + '.ksvl-cd-face { position: absolute; inset: 0; backface-visibility: hidden; -webkit-backface-visibility: hidden; transition: transform 0.62s cubic-bezier(0.4, 0.15, 0.2, 1); border-radius: 6px; overflow: hidden; }'
    + '.ksvl-cd-face--front { transform: rotateY(0deg); }'
    + '.ksvl-cd-face--front .ksvl-cd-jewel { position: absolute; inset: 0; margin: 0; box-shadow: none; }'
    + '.ksvl-cd-face--back { transform: rotateY(-180deg); background: linear-gradient(135deg, rgba(255,253,251,0.99) 0%, rgba(250,242,246,0.99) 100%); padding: 20px 22px 16px; box-shadow: 0 2px 6px rgba(75,33,72,0.08), 0 10px 24px rgba(75,33,72,0.14); overflow: hidden; display: flex; flex-direction: column; }'
    + '.ksvl-cd-flip.is-flipped .ksvl-cd-face--front { transform: rotateY(180deg); }'
    + '.ksvl-cd-flip.is-flipped .ksvl-cd-face--back { transform: rotateY(0deg); }'
    + '.ksvl-cd-play-btn { position: absolute; bottom: 12px; right: 12px; width: 46px; height: 46px; border-radius: 50%; background: rgba(75,33,72,0.92); color: var(--cream, #fffdfb); border: 2px solid rgba(255,253,251,0.85); font-size: 17px; font-family: inherit; padding: 0 0 0 3px; cursor: pointer; z-index: 3; box-shadow: 0 4px 14px rgba(75,33,72,0.4); transition: transform 0.15s ease, background 0.15s ease; }'
    + '.ksvl-cd-play-btn:hover, .ksvl-cd-play-btn:focus-visible { background: var(--rose, #9b3f5f); transform: scale(1.08); outline: none; }'
    + '.ksvl-cd-flip-back-btn { position: absolute; top: 10px; right: 10px; width: 32px; height: 32px; border-radius: 50%; background: rgba(75,33,72,0.10); color: var(--plum, #4b2148); border: 0; font-size: 16px; font-family: inherit; cursor: pointer; z-index: 3; transition: background 0.15s ease, color 0.15s ease; }'
    + '.ksvl-cd-flip-back-btn:hover, .ksvl-cd-flip-back-btn:focus-visible { background: rgba(155,63,95,0.24); color: var(--rose, #9b3f5f); outline: none; }'
    + '.ksvl-cd-back-eyebrow { margin: 0 0 4px; font-family: "Jost", sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: var(--rose, #9b3f5f); }'
    + '.ksvl-cd-back-title { margin: 0 40px 10px 0; font-family: "Playfair Display", Georgia, serif; font-size: 17px; font-weight: 700; color: var(--plum-deep, #341446); line-height: 1.15; }'
    + '.ksvl-cd-tracklist-back { list-style: none; margin: 0; padding: 0; overflow-y: auto; flex: 1; }'
    + '.ksvl-cd-tracklist-back::-webkit-scrollbar { width: 6px; }'
    + '.ksvl-cd-tracklist-back::-webkit-scrollbar-thumb { background: rgba(75,33,72,0.22); border-radius: 3px; }'
    + '.ksvl-cd-back-track { display: flex; align-items: center; gap: 8px; width: 100%; background: transparent; border: 0; padding: 6px 4px; font: inherit; font-size: 12px; font-family: "Jost", sans-serif; color: var(--plum, #4b2148); text-align: left; cursor: pointer; border-radius: 4px; transition: background 0.12s ease, color 0.12s ease; }'
    + '.ksvl-cd-back-track:hover, .ksvl-cd-back-track:focus-visible { background: rgba(155,63,95,0.10); color: var(--rose, #9b3f5f); outline: none; }'
    + '.ksvl-cd-back-track-icon { flex-shrink: 0; width: 16px; height: 16px; border-radius: 999px; background: var(--gold, #c9a227); color: var(--cream, #fffdfb); display: inline-flex; align-items: center; justify-content: center; font-size: 8px; font-weight: 800; }'
    + '.ksvl-cd-back-track:hover .ksvl-cd-back-track-icon { background: var(--rose, #9b3f5f); }'
    + '.ksvl-cd-back-track-title { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }'
    /* Now Playing bar */
    + '.ksvl-now-playing { position: fixed; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, var(--plum, #4b2148) 0%, var(--rose, #9b3f5f) 100%); color: var(--cream, #fffdfb); padding: 14px 22px; display: none; align-items: center; gap: 16px; z-index: 9997; box-shadow: 0 -6px 20px rgba(75,33,72,0.35); font-family: "Jost", sans-serif; }'
    + '.ksvl-now-playing.is-visible { display: flex; }'
    + '.ksvl-np-cd-mini { flex-shrink: 0; width: 42px; height: 42px; border-radius: 50%; background: radial-gradient(circle at 30% 30%, #f8eef2, #d8bfd0 45%, #a8779a 75%, #6b3a66); box-shadow: inset 0 0 4px rgba(0,0,0,0.2); animation: ksvl-spin 5s linear infinite; position: relative; }'
    + '.ksvl-np-cd-mini::after { content: ""; position: absolute; inset: 0; margin: auto; width: 30%; height: 30%; border-radius: 50%; background: var(--cream, #fffdfb); }'
    + '.ksvl-np-cd-mini.is-paused { animation-play-state: paused; }'
    + '.ksvl-np-info { flex: 1; min-width: 0; }'
    + '.ksvl-np-mix { display: block; font-size: 10px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: var(--gold, #c9a227); margin-bottom: 2px; }'
    + '.ksvl-np-track { display: block; font-size: 15px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }'
    + '.ksvl-np-position { font-size: 11px; opacity: 0.7; }'
    + '.ksvl-np-controls { display: flex; align-items: center; gap: 6px; }'
    + '.ksvl-np-btn { background: rgba(255,253,251,0.22); border: 1.5px solid rgba(255,253,251,0.5); color: var(--cream, #fffdfb); border-radius: 999px; padding: 8px 12px; cursor: pointer; font-size: 17px; line-height: 1; font-family: inherit; transition: background 0.15s ease, border-color 0.15s ease; text-shadow: 0 1px 2px rgba(0,0,0,0.35); }'
    + '.ksvl-np-btn:hover, .ksvl-np-btn:focus { background: rgba(255,253,251,0.34); border-color: var(--gold, #c9a227); outline: none; }'
    + '.ksvl-np-btn--play { min-width: 44px; }'
    + '.ksvl-np-btn--close { background: transparent; border-color: transparent; opacity: 0.85; }'
    + '.ksvl-np-btn--close:hover { opacity: 1; background: rgba(255,253,251,0.18); }'
    + '.ksvl-np-btn--toggle { opacity: 0.82; }'
    + '.ksvl-np-btn--toggle.is-active { opacity: 1; background: rgba(201,162,39,0.32); border-color: var(--gold, #c9a227); color: var(--cream, #fffdfb); }'
    + '.ksvl-np-btn--link { text-decoration: none; display: inline-flex; align-items: center; justify-content: center; }'
    + '@media (max-width: 720px) { .ksvl-np-btn--toggle, .ksvl-np-btn--link { display: none; } }'
    + '@media (max-width: 620px) { .ksvl-np-info .ksvl-np-position { display: none; } .ksvl-now-playing { padding: 12px 14px; gap: 10px; } .ksvl-np-btn { padding: 6px 10px; } }';

  function injectStyle() {
    if (document.getElementById('ksvl-mix-cds-style')) return;
    var s = document.createElement('style');
    s.id = 'ksvl-mix-cds-style';
    s.textContent = STYLE;
    document.head.appendChild(s);
  }

  function el(tag, attrs, children) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function(k) {
      if (k === 'class') e.className = attrs[k];
      else if (k === 'text') e.textContent = attrs[k];
      else if (k.slice(0,2) === 'on') e.addEventListener(k.slice(2), attrs[k]);
      else e.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function(c) { if (c) e.appendChild(c); });
    return e;
  }

  // ---- Player state ----
  var state = {
    audio: null,
    mixId: null,
    queue: [],
    index: 0,
    currentPart: 0,       // for multi-part tracks (intro+spot)
    paused: false,
    shuffle: false,
    repeatMode: 'all',    // 'off' | 'all' | 'one'
    preloadedAudio: null,
    preloadedSrc: null
  };

  // Resolve the currently-playing sub-item (part) or the track itself.
  function currentPart() {
    var t = state.queue[state.index];
    if (t && t.parts && t.parts.length) return t.parts[state.currentPart] || t.parts[0];
    return t;
  }
  function currentSrc() { var p = currentPart(); return p ? p.src : null; }

  var np, npMini, npMix, npTrack, npPosition, npPlayBtn, npShuffleBtn, npRepeatBtn;

  function ensureNowPlaying() {
    if (np) return np;
    np = el('div', {class: 'ksvl-now-playing', 'aria-live': 'polite'});
    npMini = el('div', {class: 'ksvl-np-cd-mini'});
    var info = el('div', {class: 'ksvl-np-info'});
    npMix = el('span', {class: 'ksvl-np-mix'});
    npTrack = el('span', {class: 'ksvl-np-track'});
    npPosition = el('span', {class: 'ksvl-np-position'});
    info.appendChild(npMix);
    info.appendChild(npTrack);
    info.appendChild(npPosition);
    var controls = el('div', {class: 'ksvl-np-controls'});
    npShuffleBtn = el('button', {class: 'ksvl-np-btn ksvl-np-btn--toggle', type: 'button', 'aria-label': 'Shuffle · off', title: 'Shuffle', onclick: toggleShuffle, text: '🔀'});
    var prev = el('button', {class: 'ksvl-np-btn', type: 'button', 'aria-label': 'Previous track', title: 'Previous', onclick: prevTrack, text: '⏮'});
    npPlayBtn = el('button', {class: 'ksvl-np-btn ksvl-np-btn--play', type: 'button', 'aria-label': 'Pause', title: 'Play / Pause', onclick: togglePlay, text: '⏸'});
    var next = el('button', {class: 'ksvl-np-btn', type: 'button', 'aria-label': 'Next track', title: 'Next', onclick: nextTrack, text: '⏭'});
    npRepeatBtn = el('button', {class: 'ksvl-np-btn ksvl-np-btn--toggle is-active', type: 'button', 'aria-label': 'Repeat all', title: 'Repeat', onclick: cycleRepeat, text: '🔁'});
    var home = el('a', {class: 'ksvl-np-btn ksvl-np-btn--link', href: '/radio.html', 'aria-label': 'Go to KSVL Radio', title: 'Open KSVL Radio', text: '📻'});
    var close = el('button', {class: 'ksvl-np-btn ksvl-np-btn--close', type: 'button', 'aria-label': 'Stop', title: 'Stop', onclick: stopPlayer, text: '✕'});
    controls.appendChild(npShuffleBtn);
    controls.appendChild(prev);
    controls.appendChild(npPlayBtn);
    controls.appendChild(next);
    controls.appendChild(npRepeatBtn);
    controls.appendChild(home);
    controls.appendChild(close);
    np.appendChild(npMini);
    np.appendChild(info);
    np.appendChild(controls);
    document.body.appendChild(np);
    return np;
  }

  function updateCDPlayingClass() {
    document.querySelectorAll('.ksvl-cd').forEach(function(cd) {
      if (cd.getAttribute('data-mix') === state.mixId) cd.classList.add('is-playing');
      else cd.classList.remove('is-playing');
    });
  }

  function updateNowPlaying() {
    ensureNowPlaying();
    if (!state.queue.length) return;
    var track = state.queue[state.index];
    var part = currentPart();
    var mix = state.mixId === 'live'
      ? LIVE_MIX
      : MIXES.filter(function(m) { return m.id === state.mixId; })[0];
    var label;
    if (state.mixId === 'live') {
      label = 'KSVL LIVE · ' + (state.index + 1) + ' on air';
    } else if (state.mixId && state.mixId.indexOf('album:') === 0) {
      var albumArtist = state.mixId.slice(6);
      label = albumArtist + ' · Track ' + (state.index + 1) + ' / ' + state.queue.length;
    } else {
      label = (mix ? mix.title : 'KSVL') + ' · Track ' + (state.index + 1) + ' / ' + state.queue.length;
    }
    npMix.textContent = label;
    // Show the current part's label if this is a multi-part track (intro/spot pair).
    var displayTitle = (track.parts && part && part.title) ? part.title : track.title;
    var displayArtist = (track.parts && part && part.artist) ? part.artist : track.artist;
    npTrack.textContent = displayTitle;
    npPosition.textContent = ' · ' + displayArtist;
    npPlayBtn.textContent = state.paused ? '▶' : '⏸';
    npPlayBtn.setAttribute('aria-label', state.paused ? 'Play' : 'Pause');
    if (state.paused) npMini.classList.add('is-paused');
    else npMini.classList.remove('is-paused');
    np.classList.add('is-visible');
    updateCDPlayingClass();
  }

  function stopExistingAudio() {
    if (state.audio) {
      try { state.audio.pause(); } catch(e) {}
      state.audio = null;
    }
    // Also pause any other <audio> elements from other players (e.g. individual saint buttons)
    document.querySelectorAll('audio').forEach(function(a) { try { a.pause(); } catch(e) {} });
  }

  var playToken = 0;
  function playIndex(i) {
    state.index = ((i % state.queue.length) + state.queue.length) % state.queue.length;
    state.currentPart = 0;
    playCurrentPart();
  }

  // Play the current part (or the whole track if no parts). Handles intro→spot flow.
  function playCurrentPart() {
    var myToken = ++playToken;
    stopExistingAudio();
    var track = state.queue[state.index];
    var part = currentPart();
    var src = part ? part.src : track.src;
    var displayTitle = (track.parts && part && part.title) ? part.title : track.title;
    // Use preloaded audio if it matches, else create fresh
    var audio;
    if (state.preloadedAudio && state.preloadedSrc === src) {
      audio = state.preloadedAudio;
    } else {
      audio = new Audio(src);
      audio.preload = 'auto';
    }
    state.preloadedAudio = null;
    state.preloadedSrc = null;
    console.log('[KSVL] Play', state.index + 1, ':', displayTitle, '·', src);
    audio.addEventListener('ended', function() {
      if (myToken !== playToken) { console.log('[KSVL] Stale ended ignored for', displayTitle); return; }
      console.log('[KSVL] Ended', displayTitle);
      // If this track has more parts, advance to next part; else advance to next track.
      if (track.parts && state.currentPart < track.parts.length - 1) {
        state.currentPart++;
        playCurrentPart();
      } else {
        advanceOnEnded();
      }
    });
    audio.addEventListener('error', function(e) {
      if (myToken !== playToken) return;
      console.warn('[KSVL] Audio error on', src, e);
      setTimeout(function() {
        if (myToken !== playToken) return;
        if (track.parts && state.currentPart < track.parts.length - 1) {
          state.currentPart++;
          playCurrentPart();
        } else {
          advanceOnEnded();
        }
      }, 200);
    });
    audio.play().catch(function(err) { console.warn('[KSVL] play() rejected for', src, err); });
    state.audio = audio;
    state.paused = false;
    updateNowPlaying();
    preloadNextInFlow();
  }

  // Preload whatever plays next in the flow: next part of current track, or first part of next track.
  function preloadNextInFlow() {
    var track = state.queue[state.index];
    var nextSrc = null;
    if (track && track.parts && state.currentPart < track.parts.length - 1) {
      nextSrc = track.parts[state.currentPart + 1].src;
    } else {
      var nextIdx;
      if (state.repeatMode === 'one') { nextIdx = state.index; }
      else if (state.shuffle) { return; /* shuffle picks at runtime */ }
      else if (state.repeatMode === 'off' && state.index >= state.queue.length - 1) { return; }
      else { nextIdx = (state.index + 1) % state.queue.length; }
      var nextTrack = state.queue[nextIdx];
      if (!nextTrack) return;
      nextSrc = nextTrack.parts ? nextTrack.parts[0].src : nextTrack.src;
    }
    if (!nextSrc) return;
    var next = new Audio(nextSrc);
    next.preload = 'auto';
    state.preloadedAudio = next;
    state.preloadedSrc = nextSrc;
  }

  function advanceOnEnded() {
    if (state.signingOff) { realStopPlayer(); return; }
    if (state.repeatMode === 'one') { playIndex(state.index); return; }
    if (state.shuffle) { playIndex(Math.floor(Math.random() * state.queue.length)); return; }
    if (state.repeatMode === 'off' && state.index >= state.queue.length - 1) { stopPlayer(); return; }
    playIndex(state.index + 1);
  }

  function toggleShuffle() {
    state.shuffle = !state.shuffle;
    if (npShuffleBtn) {
      npShuffleBtn.classList.toggle('is-active', state.shuffle);
      npShuffleBtn.setAttribute('aria-label', state.shuffle ? 'Shuffle · on' : 'Shuffle · off');
    }
  }

  function cycleRepeat() {
    state.repeatMode = state.repeatMode === 'off' ? 'all' : (state.repeatMode === 'all' ? 'one' : 'off');
    if (npRepeatBtn) {
      npRepeatBtn.classList.toggle('is-active', state.repeatMode !== 'off');
      npRepeatBtn.textContent = state.repeatMode === 'one' ? '🔂' : '🔁';
      npRepeatBtn.setAttribute('aria-label', state.repeatMode === 'off' ? 'Repeat off' : (state.repeatMode === 'one' ? 'Repeat one' : 'Repeat all'));
      npRepeatBtn.setAttribute('title', 'Repeat: ' + state.repeatMode);
    }
  }

  // Every playback starts with the KSVL station-ID jingle
  function stationOpener() {
    return {
      title: 'KSVL · SUNNYVAiLE\'s Own',
      artist: 'KSVL',
      src: JINGLES_DIR + 'jingle-ksvl-station-id.mp3'
    };
  }

  // Signoff pair (jingle → DJ farewell). Only plays when the user hits Stop.
  function signoffPair() {
    return {
      title: 'KSVL · Signing off',
      artist: 'KSVL',
      parts: [
        { src: JINGLES_DIR + 'jingle-ksvl-signoff.mp3',       title: 'KSVL · Goodnight',        artist: 'KSVL' },
        { src: TRANSITIONS_DIR + 'dj-jaidy-signoff.mp3',      title: 'DJ SunnyV · Signing off',  artist: 'DJ SunnyV' }
      ]
    };
  }

  function startMix(mixId, startTrackIndex) {
    var mix = MIXES.filter(function(m) { return m.id === mixId; })[0];
    if (!mix) return;
    var queue = tracksForMix(mixId);
    if (!queue.length) return;
    state.mixId = mixId;
    state.queue = [stationOpener()].concat(queue.map(wrapWithIntro));
    // startTrackIndex is 0-based against the track list; queue index is +1 (opener at 0)
    var startAt = 0;
    if (typeof startTrackIndex === 'number' && startTrackIndex >= 0 && startTrackIndex < queue.length) {
      startAt = startTrackIndex + 1; // skip the opener
    }
    playIndex(startAt);
  }

  // Play one band's album — filters TRACKS by artist, wraps each with intro, opens with station ID.
  function tracksForArtist(artist) {
    return TRACKS.filter(function(t) { return t.artist === artist; });
  }
  function startAlbum(artist, startTrackIndex) {
    var queue = tracksForArtist(artist);
    if (!queue.length) return;
    state.mixId = 'album:' + artist;
    state.queue = [stationOpener()].concat(queue.map(wrapWithIntro));
    var startAt = 0;
    if (typeof startTrackIndex === 'number' && startTrackIndex >= 0 && startTrackIndex < queue.length) {
      startAt = startTrackIndex + 1;
    }
    playIndex(startAt);
  }
  window.KSVL_startAlbum = startAlbum;
  window.KSVL_tracksForArtist = tracksForArtist;

  function nextTrack() { if (state.queue.length) playIndex(state.index + 1); }
  function prevTrack() { if (state.queue.length) playIndex(state.index - 1); }

  function togglePlay() {
    if (!state.audio) return;
    if (state.paused) {
      state.audio.play().catch(function() {});
      state.paused = false;
    } else {
      state.audio.pause();
      state.paused = true;
    }
    updateNowPlaying();
  }

  // Immediate hard-stop. Used after signoff finishes or if user double-taps Stop.
  function realStopPlayer() {
    stopExistingAudio();
    state.mixId = null; state.queue = []; state.index = 0; state.currentPart = 0; state.paused = false;
    state.signingOff = false;
    state.preloadedAudio = null; state.preloadedSrc = null;
    if (np) np.classList.remove('is-visible');
    document.querySelectorAll('.ksvl-cd').forEach(function(cd) { cd.classList.remove('is-playing'); });
    try { localStorage.removeItem('laidies_ksvl_player_state_v1'); } catch(e) {}
  }

  // User-facing Stop. First click triggers the signoff pair; second click force-closes.
  function stopPlayer() {
    if (state.signingOff) { realStopPlayer(); return; }
    if (!state.queue.length) { realStopPlayer(); return; }
    state.signingOff = true;
    state.mixId = 'signoff';
    state.queue = [signoffPair()];
    state.index = 0;
    state.currentPart = 0;
    state.preloadedAudio = null; state.preloadedSrc = null;
    playCurrentPart();
  }

  // ---- Rack UI ----
  function buildCD(mix) {
    var tracks = tracksForMix(mix.id);
    var trackCount = tracks.length;

    // Front face — CD jewel case artwork
    var jewel = el('div', {class: 'ksvl-cd-jewel'});
    if (mix.image) {
      jewel.appendChild(el('img', {class: 'ksvl-cd-image', src: mix.image, alt: '', loading: 'lazy'}));
    } else {
      jewel.appendChild(el('div', {class: 'ksvl-cd-disc'}));
    }
    var sharpie = el('div', {class: 'ksvl-cd-sharpie', text: mix.title});
    var tc = el('div', {class: 'ksvl-cd-sharpie ksvl-cd-sharpie--track-count', text: trackCount + ' Tracks'});
    tc.style.top = 'auto'; tc.style.bottom = '18px';
    jewel.appendChild(sharpie);
    jewel.appendChild(tc);

    // ▶ play-whole-mix button on the cover
    var playBtn = el('button', {
      class: 'ksvl-cd-play-btn',
      type: 'button',
      'aria-label': 'Play whole ' + mix.title + ' mix — ' + trackCount + ' tracks',
      title: 'Play whole mix',
      text: '▶'
    });
    playBtn.addEventListener('click', function(e) { e.stopPropagation(); startMix(mix.id); });
    var front = el('div', {class: 'ksvl-cd-face ksvl-cd-face--front'}, [jewel, playBtn]);

    // Back face — full tracklist + flip-back button
    var backList = el('ul', {class: 'ksvl-cd-tracklist-back'});
    tracks.forEach(function(t, i) {
      var trackBtn = el('button', {
        class: 'ksvl-cd-back-track',
        type: 'button',
        'aria-label': 'Play ' + (t.title || 'Untitled')
      }, [
        el('span', {class: 'ksvl-cd-back-track-icon', text: '▶'}),
        el('span', {class: 'ksvl-cd-back-track-title', text: t.title || 'Untitled'})
      ]);
      (function(idx) {
        trackBtn.addEventListener('click', function(e) { e.stopPropagation(); startMix(mix.id, idx); });
      })(i);
      backList.appendChild(el('li', {}, [trackBtn]));
    });
    var backHeader = el('p', {class: 'ksvl-cd-back-title', text: mix.title});
    var backEyebrow = el('p', {class: 'ksvl-cd-back-eyebrow', text: trackCount + (trackCount === 1 ? ' track' : ' tracks')});
    var flipBackBtn = el('button', {
      class: 'ksvl-cd-flip-back-btn',
      type: 'button',
      'aria-label': 'Flip CD back to cover',
      title: 'Flip back',
      text: '↺'
    });
    var back = el('div', {class: 'ksvl-cd-face ksvl-cd-face--back'}, [flipBackBtn, backEyebrow, backHeader, backList]);

    // 3D flip container — cover click flips, ▶ button plays.
    var flipContainer = el('div', {
      class: 'ksvl-cd ksvl-cd-flip',
      'data-mix': mix.id,
      role: 'button',
      tabindex: '0',
      'aria-label': 'Flip ' + mix.title + ' CD to see the tracklist'
    }, [front, back]);
    flipContainer.addEventListener('click', function(e) {
      if (e.target.closest('button')) return;
      flipContainer.classList.toggle('is-flipped');
    });
    flipContainer.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flipContainer.classList.toggle('is-flipped'); }
    });
    flipBackBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      flipContainer.classList.remove('is-flipped');
    });

    var caption = el('div', {class: 'ksvl-cd-caption'}, [
      el('p', {class: 'ksvl-cd-caption-title', text: mix.title}),
      el('p', {class: 'ksvl-cd-caption-sub', text: mix.sub})
    ]);

    return el('div', {class: 'ksvl-cd-item'}, [flipContainer, caption]);
  }

  function mount() {
    injectStyle();
    var mountEl = document.getElementById('ksvl-mix-cds');
    if (mountEl) {
      var rack = el('div', {class: 'ksvl-mix-rack'}, [
        el('div', {class: 'ksvl-mix-eyebrow', text: '★ KSVL · Mix CDs'}),
        el('h2', {class: 'ksvl-mix-title', text: 'Pick a mix.'}),
        el('p', {class: 'ksvl-mix-lede', text: 'A rack of Sharpie-labeled CD-Rs. Tap a case to flip it and see the tracklist; hit ▶ to play the whole mix.'}),
        el('div', {class: 'ksvl-mix-grid'})
      ]);
      var grid = rack.querySelector('.ksvl-mix-grid');
      MIXES.forEach(function(mix) { grid.appendChild(buildCD(mix)); });
      mountEl.innerHTML = '';
      mountEl.appendChild(rack);
    }
    // Always try to hydrate saved playback — the persistent bar follows the visitor
    // across every page, so any page can pick up where they left off.
    hydrateFromStorage();
  }

  // ---- Persistence: save on unload, hydrate on load ----
  var LS_KEY = 'laidies_ksvl_player_state_v1';
  var STATE_TTL_MS = 1000 * 60 * 60 * 6; // 6 hours — old sessions won't auto-resume

  function trackIdFor(item) {
    // Only catalog tracks have stable IDs. Jingles, wrapped intros, commercials return null.
    return (item && item.id) ? item.id : null;
  }

  function saveState() {
    try {
      if (!state.mixId || !state.queue.length) { localStorage.removeItem(LS_KEY); return; }
      // Only save mix + album contexts. Live/signoff/album-of-a-transient-band are stateless.
      var ctx = null, extra = {};
      if (state.mixId.indexOf('album:') === 0) { ctx = 'album'; extra.artist = state.mixId.slice(6); }
      else if (MIXES.some(function(m){ return m.id === state.mixId; })) { ctx = 'mix'; extra.mixId = state.mixId; }
      else { localStorage.removeItem(LS_KEY); return; }
      var track = state.queue[state.index];
      var currentTime = 0;
      try { if (state.audio && !isNaN(state.audio.currentTime)) currentTime = state.audio.currentTime; } catch(e) {}
      var payload = {
        v: 1,
        ctx: ctx,
        trackId: trackIdFor(track),
        currentTime: currentTime,
        paused: !!state.paused,
        shuffle: !!state.shuffle,
        repeatMode: state.repeatMode || 'all',
        savedAt: (new Date()).valueOf()
      };
      Object.keys(extra).forEach(function(k){ payload[k] = extra[k]; });
      localStorage.setItem(LS_KEY, JSON.stringify(payload));
    } catch(e) { /* localStorage quota / disabled — silently ignore */ }
  }

  function readSavedState() {
    try {
      var raw = localStorage.getItem(LS_KEY);
      if (!raw) return null;
      var s = JSON.parse(raw);
      if (!s || s.v !== 1) return null;
      if ((new Date()).valueOf() - (s.savedAt || 0) > STATE_TTL_MS) { localStorage.removeItem(LS_KEY); return null; }
      return s;
    } catch(e) { return null; }
  }

  function hydrateFromStorage() {
    var s = readSavedState();
    if (!s) return;
    // Build the queue for the saved context.
    var queue = null;
    if (s.ctx === 'mix') { queue = tracksForMix(s.mixId); }
    else if (s.ctx === 'album') { queue = tracksForArtist(s.artist); }
    if (!queue || !queue.length) return;
    // Find the saved track in the queue.
    var trackIdx = -1;
    if (s.trackId) {
      for (var i = 0; i < queue.length; i++) { if (queue[i].id === s.trackId) { trackIdx = i; break; } }
    }
    if (trackIdx < 0) trackIdx = 0;
    // Rehydrate state — station opener is added at queue[0], real tracks start at 1.
    state.mixId = (s.ctx === 'album') ? ('album:' + s.artist) : s.mixId;
    state.queue = [stationOpener()].concat(queue.map(wrapWithIntro));
    state.index = trackIdx + 1;
    state.currentPart = 0;
    state.shuffle = !!s.shuffle;
    state.repeatMode = s.repeatMode || 'all';
    if (npShuffleBtn) { npShuffleBtn.classList.toggle('is-active', state.shuffle); }
    if (npRepeatBtn) {
      npRepeatBtn.classList.toggle('is-active', state.repeatMode !== 'off');
      npRepeatBtn.textContent = state.repeatMode === 'one' ? '🔂' : '🔁';
    }
    // Play through the current track, seeking on canplay to the saved position.
    playCurrentPart();
    var seekTo = +s.currentTime || 0;
    var wasPaused = !!s.paused;
    var attemptSeek = function() {
      if (!state.audio) return;
      try { if (seekTo > 0 && !isNaN(state.audio.duration)) state.audio.currentTime = Math.min(seekTo, Math.max(0, state.audio.duration - 0.5)); } catch(e) {}
      if (wasPaused) {
        try { state.audio.pause(); } catch(e) {}
        state.paused = true;
        updateNowPlaying();
      }
    };
    if (state.audio) {
      if (state.audio.readyState >= 1 /* HAVE_METADATA */) attemptSeek();
      else state.audio.addEventListener('loadedmetadata', attemptSeek, { once: true });
    }
  }

  function bindPersistenceHooks() {
    // Save aggressively — the exact unload event varies by browser + platform.
    window.addEventListener('beforeunload', saveState);
    window.addEventListener('pagehide', saveState);
    document.addEventListener('visibilitychange', function() { if (document.visibilityState === 'hidden') saveState(); });
    // Periodic save while playing, so a browser crash doesn't lose position.
    setInterval(function() { if (state.audio && !state.paused) saveState(); }, 5000);
  }

  bindPersistenceHooks();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
