/**
 * KSVL Mix CDs Player
 *
 * Renders a rack of burned CD-Rs on any page.
 * Mount by adding <div id="ksvl-mix-cds"></div>, then include this script.
 *
 * Six mixes: All Songs · Anthems · Patron Saints · Activities · Episodes · B-side
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

  // ---- Track library (single source of truth) ----
  var TRACKS = [
    // Anthems
    { id: 'town-anthem',           title: 'Welcome to SUNNYVAiLE',                 artist: 'THE LAiDIES',   src: MUSIC + 'sunnyvaile-town-anthem.mp3',                         mixes: ['anthems'] },
    { id: 'wednesdays-in-sv',      title: 'Wednesdays in SUNNYVAiLE',              artist: 'THE LAiDIES',   src: MUSIC + 'the-laidies-wednesday-in-sunnyvaile.mp3',           mixes: ['anthems'] },

    // Patron Saints
    { id: 'saint-buffy',           title: 'Buffy Summers · Doing the Scary Thing Anyway',    artist: 'DJ JAiDY',   src: MUSIC + 'saint-buffy-summers.mp3',      mixes: ['saints'] },
    { id: 'saint-cher',            title: 'Cher Horowitz · Pattern Matching',                artist: 'DJ JAiDY',   src: MUSIC + 'saint-cher-horowitz.mp3',      mixes: ['saints'] },
    { id: 'saint-david',           title: 'David Rose · Specificity',                        artist: 'DJ JAiDY',   src: MUSIC + 'saint-david-rose.mp3',         mixes: ['saints'] },
    { id: 'saint-deb',             title: 'Deb · Loop Me Out',                               artist: 'DJ JAiDY',   src: MUSIC + 'saint-deb.mp3',                mixes: ['saints'] },
    { id: 'saint-dolly',           title: 'Dolly Parton · Common Sense',                     artist: 'DJ JAiDY',   src: MUSIC + 'saint-dolly-parton.mp3',       mixes: ['saints'] },
    { id: 'saint-elle',            title: 'Elle Woods · Receipts',                           artist: 'DJ JAiDY',   src: MUSIC + 'saint-elle-woods.mp3',         mixes: ['saints'] },
    { id: 'saint-miranda',         title: 'Miranda Priestly · Executive Standards',          artist: 'DJ JAiDY',   src: MUSIC + 'saint-miranda-priestly.mp3',   mixes: ['saints'] },
    { id: 'saint-regina',          title: 'Regina George · Social Power',                    artist: 'DJ JAiDY',   src: MUSIC + 'saint-regina-george.mp3',      mixes: ['saints'] },

    // Activities
    { id: 'ask-laidy',             title: 'Ask LAiDY',                             artist: 'DJ JAiDY',   src: MUSIC + 'game-ask-laidy.mp3',                                 mixes: ['activities'] },
    { id: 'businesswomens',        title: "Businesswomen's Special",               artist: 'DJ JAiDY',   src: MUSIC + 'game-businesswomens-special.mp3',                    mixes: ['activities'] },
    { id: 'dream-phone',           title: 'Dream Phone',                           artist: 'DJ JAiDY',   src: MUSIC + 'game-dream-phone.mp3',                               mixes: ['activities'] },
    { id: 'girl-talk',             title: 'Girl Talk',                             artist: 'DJ JAiDY',   src: MUSIC + 'game-girl-talk.mp3',                                 mixes: ['activities'] },
    { id: 'mme-claio',             title: "Mme CLAi-O's Shop",                     artist: 'DJ JAiDY',   src: MUSIC + 'game-mme-claio.mp3',                                 mixes: ['activities'] },
    { id: 'blend-and-snap',        title: 'Down at the Blend & Snap',              artist: 'THE LAiDIES',   src: MUSIC + 'the-laidies-down-at-the-blend-and-snap.mp3',         mixes: ['activities'] },
    { id: 'the-library',           title: 'The LIBRAiRY',                          artist: 'DJ JAiDY',   src: MUSIC + 'dj-jaidy-week-04-the-library.mp3',                     mixes: ['activities'] },

    // Episodes
    { id: 'ep-01',                 title: 'Ep 01 · On Wednesdays We Do AI',                       artist: 'DJ JAiDY',   src: MUSIC + 'dj-jaidy-week-01-on-wednesday-we-do-ai.mp3',           mixes: ['episodes'] },
    { id: 'ep-02',                 title: 'Ep 02 · Tell Me What You Want',                        artist: 'DJ JAiDY',   src: MUSIC + 'dj-jaidy-week-02-tell-me-what-you-want.mp3',           mixes: ['episodes'] },
    { id: 'ep-03',                 title: "Ep 03 · Don't Be Chutney on the Stand",                artist: 'DJ JAiDY',   src: MUSIC + 'dj-jaidy-week-03-dont-be-chutney-on-the-stand.mp3',    mixes: ['episodes'] },
    { id: 'every-slaiyer-watcher', title: 'Every SLAiYER Needs a Watcher',                        artist: 'DJ JAiDY',   src: MUSIC + 'dj-jaidy-every-slaiyer-needs-a-watcher.mp3',           mixes: ['episodes'] },

    // B-side
    { id: 'impossible',            title: 'Impossible to Underestimate You',                    artist: 'DJ JAiDY',   src: MUSIC + 'dj-jaidy-impossible-to-underestimate-you.mp3',        mixes: ['bside'] },
    { id: 'debs-tomorrow',         title: "Deb's Tomorrow Problem",                              artist: 'DJ JAiDY',   src: MUSIC + 'debs-tomorrow-problem.mp3',                            mixes: ['bside'] }
  ];

  // ---- Mix definitions (order matters — display order in the rack) ----
  var MIXES = [
    { id: 'all',        title: 'All Songs',         sub: 'Everything KSVL has',                     color: 'plum',    labelStyle: 'sharpie' },
    { id: 'anthems',    title: 'Anthems',           sub: 'The town identity tracks',                color: 'gold',    labelStyle: 'sharpie' },
    { id: 'saints',     title: 'Patron Saints',     sub: 'One track per saint',                     color: 'rose',    labelStyle: 'sharpie' },
    { id: 'activities', title: 'Activities',        sub: 'Game themes + hangouts',                  color: 'teal',    labelStyle: 'sharpie' },
    { id: 'episodes',   title: 'Episodes',          sub: 'DJ JAiDY intros, one per issue',          color: 'plum',    labelStyle: 'sharpie' },
    { id: 'bside',      title: 'B-side',            sub: "Bonus tracks that don't fit elsewhere",   color: 'rose',    labelStyle: 'sharpie' }
  ];

  function tracksForMix(mixId) {
    if (mixId === 'all') return TRACKS.slice();
    return TRACKS.filter(function(t) { return t.mixes.indexOf(mixId) >= 0; });
  }

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
    + '.ksvl-cd-jewel { position: relative; aspect-ratio: 1 / 1; background: linear-gradient(135deg, rgba(255,253,251,0.92) 0%, rgba(248,238,242,0.92) 100%); border-radius: 4px; box-shadow: 0 3px 10px rgba(75,33,72,0.16), 0 12px 28px rgba(75,33,72,0.16); overflow: hidden; padding: 14px; }'
    + '.ksvl-cd-jewel::before { content: ""; position: absolute; inset: 0; background: repeating-linear-gradient(115deg, transparent 0 20px, rgba(255,255,255,0.35) 20px 22px); pointer-events: none; opacity: 0.4; }'
    + '.ksvl-cd-disc { position: absolute; inset: 0; margin: auto; width: 88%; height: 88%; border-radius: 50%; background: radial-gradient(circle at 30% 30%, #f8eef2, #d8bfd0 45%, #a8779a 75%, #6b3a66); box-shadow: inset 0 0 6px rgba(0,0,0,0.15); }'
    + '.ksvl-cd-disc::after { content: ""; position: absolute; inset: 0; margin: auto; width: 22%; height: 22%; border-radius: 50%; background: var(--cream, #fffdfb); box-shadow: inset 0 0 3px rgba(75,33,72,0.4); border: 2px solid rgba(75,33,72,0.15); }'
    + '.ksvl-cd-sharpie { position: absolute; top: 18px; left: 18px; right: 18px; font-family: "Marker Felt", "Comic Sans MS", cursive; font-size: 18px; font-weight: 700; color: #221; transform: rotate(-4deg); text-shadow: 0 1px 0 rgba(255,255,255,0.5); line-height: 1.05; z-index: 2; }'
    + '.ksvl-cd-sharpie--track-count { font-family: "Jost", sans-serif; font-size: 10px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #442244; margin-top: 8px; transform: rotate(2deg); opacity: 0.7; }'
    + '.ksvl-cd-caption { padding: 12px 4px 0; }'
    + '.ksvl-cd-caption-title { font-family: "Playfair Display", Georgia, serif; font-size: 16px; font-weight: 700; color: var(--plum, #4b2148); margin: 0 0 2px; }'
    + '.ksvl-cd-caption-sub { font-size: 12px; color: var(--plum-soft, #6b3a66); margin: 0; font-style: italic; }'
    + '.ksvl-cd.is-playing .ksvl-cd-jewel { box-shadow: 0 0 0 3px var(--gold, #c9a227), 0 3px 10px rgba(75,33,72,0.20), 0 12px 28px rgba(75,33,72,0.20); }'
    + '.ksvl-cd.is-playing .ksvl-cd-disc { animation: ksvl-spin 5s linear infinite; }'
    + '@keyframes ksvl-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }'
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
    + '.ksvl-np-btn { background: rgba(255,253,251,0.15); border: 1px solid rgba(255,253,251,0.30); color: var(--cream, #fffdfb); border-radius: 999px; padding: 8px 12px; cursor: pointer; font-size: 13px; font-family: inherit; transition: background 0.15s ease; }'
    + '.ksvl-np-btn:hover, .ksvl-np-btn:focus { background: rgba(255,253,251,0.28); outline: none; }'
    + '.ksvl-np-btn--play { min-width: 44px; }'
    + '.ksvl-np-btn--close { background: transparent; border-color: transparent; opacity: 0.65; }'
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
    paused: false
  };

  var np, npMini, npMix, npTrack, npPosition, npPlayBtn;

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
    var prev = el('button', {class: 'ksvl-np-btn', type: 'button', 'aria-label': 'Previous track', onclick: prevTrack, text: '⏮'});
    npPlayBtn = el('button', {class: 'ksvl-np-btn ksvl-np-btn--play', type: 'button', 'aria-label': 'Pause', onclick: togglePlay, text: '⏸'});
    var next = el('button', {class: 'ksvl-np-btn', type: 'button', 'aria-label': 'Next track', onclick: nextTrack, text: '⏭'});
    var close = el('button', {class: 'ksvl-np-btn ksvl-np-btn--close', type: 'button', 'aria-label': 'Stop', onclick: stopPlayer, text: '✕'});
    controls.appendChild(prev);
    controls.appendChild(npPlayBtn);
    controls.appendChild(next);
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
    var mix = MIXES.filter(function(m) { return m.id === state.mixId; })[0];
    npMix.textContent = (mix ? mix.title : 'KSVL') + ' · Track ' + (state.index + 1) + ' / ' + state.queue.length;
    npTrack.textContent = track.title;
    npPosition.textContent = ' · ' + track.artist;
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

  function playIndex(i) {
    stopExistingAudio();
    state.index = ((i % state.queue.length) + state.queue.length) % state.queue.length;
    var track = state.queue[state.index];
    var audio = new Audio(track.src);
    audio.preload = 'metadata';
    audio.addEventListener('ended', function() { nextTrack(); });
    audio.addEventListener('error', function() { nextTrack(); });
    audio.play().catch(function() { /* browsers may block */ });
    state.audio = audio;
    state.paused = false;
    updateNowPlaying();
  }

  function startMix(mixId) {
    var mix = MIXES.filter(function(m) { return m.id === mixId; })[0];
    if (!mix) return;
    var queue = tracksForMix(mixId);
    if (!queue.length) return;
    state.mixId = mixId;
    state.queue = queue;
    playIndex(0);
  }

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

  function stopPlayer() {
    stopExistingAudio();
    state.mixId = null; state.queue = []; state.index = 0; state.paused = false;
    if (np) np.classList.remove('is-visible');
    document.querySelectorAll('.ksvl-cd').forEach(function(cd) { cd.classList.remove('is-playing'); });
  }

  // ---- Rack UI ----
  function buildCD(mix) {
    var trackCount = tracksForMix(mix.id).length;
    var jewel = el('div', {class: 'ksvl-cd-jewel'});
    jewel.appendChild(el('div', {class: 'ksvl-cd-disc'}));
    var sharpie = el('div', {class: 'ksvl-cd-sharpie', text: mix.title});
    var tc = el('div', {class: 'ksvl-cd-sharpie ksvl-cd-sharpie--track-count', text: trackCount + ' Tracks'});
    tc.style.top = 'auto'; tc.style.bottom = '18px';
    jewel.appendChild(sharpie);
    jewel.appendChild(tc);
    var caption = el('div', {class: 'ksvl-cd-caption'}, [
      el('p', {class: 'ksvl-cd-caption-title', text: mix.title}),
      el('p', {class: 'ksvl-cd-caption-sub', text: mix.sub})
    ]);
    var btn = el('button', {
      class: 'ksvl-cd',
      type: 'button',
      'data-mix': mix.id,
      'aria-label': 'Play ' + mix.title + ' mix — ' + trackCount + ' tracks',
      onclick: function() { startMix(mix.id); }
    }, [jewel, caption]);
    return btn;
  }

  function mount() {
    var mountEl = document.getElementById('ksvl-mix-cds');
    if (!mountEl) return;
    injectStyle();
    var rack = el('div', {class: 'ksvl-mix-rack'}, [
      el('div', {class: 'ksvl-mix-eyebrow', text: '★ KSVL · Mix CDs'}),
      el('h2', {class: 'ksvl-mix-title', text: 'Pick a mix.'}),
      el('p', {class: 'ksvl-mix-lede', text: 'A rack of Sharpie-labeled CD-Rs. Each mix plays straight through. Grab one and let it play.'}),
      el('div', {class: 'ksvl-mix-grid'})
    ]);
    var grid = rack.querySelector('.ksvl-mix-grid');
    MIXES.forEach(function(mix) { grid.appendChild(buildCD(mix)); });
    mountEl.innerHTML = '';
    mountEl.appendChild(rack);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
