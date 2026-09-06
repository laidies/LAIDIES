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
  // Shared header and page-local loaders may race; never create a second deck.
  if (window.__KSVL_CANONICAL_PLAYER__) return;
  window.__KSVL_CANONICAL_PLAYER__ = true;

  var MUSIC = '/content/music/';
  // ---- Track library (single source of truth) ----
  // The `intro` field, when present, points to a DJ SunnyV recorded intro that
  // plays right before the track (in mix queues + live rotation + play-all).
  var TRACKS = [
    // Anthems
    { id: 'town-anthem',           title: 'Welcome to SUNNYVAiLE',                 artist: 'THE LAiDIES',   src: MUSIC + 'sunnyvaile-town-anthem.mp3',                         mixes: ['anthems'] },
    { id: 'wednesdays-in-sv',      title: 'Wednesdays in SUNNYVAiLE',              artist: 'THE LAiDIES',   src: MUSIC + 'the-laidies-wednesday-in-sunnyvaile.mp3',           mixes: ['anthems'] },

    // PATRON SAiNTS
    { id: 'saint-bette',           title: 'Bette Midler · PATRON SAiNT of Range',             artist: 'The Ensembles',   src: MUSIC + 'saint-bette-midler.mp3',     mixes: ['saints'] },
    { id: 'saint-buffy',           title: 'Buffy · PATRON SAiNT of SLAiYING',                 artist: 'The Overfits',    src: MUSIC + 'saint-buffy-summers.mp3',    mixes: ['saints'] },
    { id: 'saint-cher',            title: 'Cher · PATRON SAiNT of Early Adoption',            artist: 'The Overfits',    src: MUSIC + 'saint-cher-horowitz.mp3',    mixes: ['saints'] },
    { id: 'saint-david',           title: 'David Rose · PATRON SAiNT of Specificity',         artist: 'Chain of Thought', src: MUSIC + 'saint-david-rose.mp3',       mixes: ['saints'] },
    { id: 'saint-deb',             title: 'Deb · PATRON SAiNT of Loop Me Out',                artist: 'Latent Space',    src: MUSIC + 'saint-deb.mp3',              mixes: ['saints'] },
    { id: 'saint-dolly',           title: 'Dolly Parton · PATRON SAiNT of Common Sense',      artist: "Grand Ol' Query", src: MUSIC + 'saint-dolly-parton.mp3',     mixes: ['saints'] },
    { id: 'saint-elle',            title: 'Elle Woods · PATRON SAiNT of Receipts',            artist: 'The Regressions', src: MUSIC + 'saint-elle-woods.mp3',       mixes: ['saints'] },
    { id: 'saint-golden-girls',    title: 'The Golden Girls · PATRON SAiNT of Never Too Late', artist: 'The Diffusions',  src: MUSIC + 'saint-golden-girls.mp3',    mixes: ['saints'] },
    { id: 'saint-miranda',         title: 'Miranda · PATRON SAiNT of Standards',              artist: 'Latent Space',    src: MUSIC + 'saint-miranda-priestly.mp3', mixes: ['saints'] },
    { id: 'saint-regina',          title: 'Regina · PATRON SAiNT of Dangerous Confidence',    artist: 'The Embeddings',  src: MUSIC + 'saint-regina-george.mp3',    mixes: ['saints'] },
    { id: 'saint-samantha',        title: 'Samantha · PATRON SAiNT of Orientation',           artist: 'The Bots',        src: MUSIC + 'saint-samantha-jones.mp3',  mixes: ['saints'] },
    { id: 'saint-sister-mary-clarence', title: 'Sister Mary Clarence · PATRON SAiNT of Teaching', artist: 'The Embeddings', src: MUSIC + 'saint-sister-mary-clarence.mp3', mixes: ['saints'] },

    // Activities
    { id: 'ask-laidy',             title: 'Ask LAiDY',                             artist: 'DJ SunnyV',       src: MUSIC + 'game-ask-laidy.mp3',                                 mixes: ['activities'] },
    { id: 'businesswomens',        title: "Businesswomen's Special",               artist: 'The Embeddings',  src: MUSIC + 'game-businesswomens-special.mp3',                    mixes: ['activities'] },
    { id: 'dream-phone',           title: 'Dream Phone',                           artist: 'The Bots',        src: MUSIC + 'game-dream-phone.mp3',                               mixes: ['activities'] },
    { id: 'girl-talk',             title: 'Girl Talk',                             artist: 'The Regressions', src: MUSIC + 'game-girl-talk.mp3',                                 mixes: ['activities'] },
    { id: 'mme-claio',             title: "Mme CLAi-O's Shop",                     artist: 'The Predicts',    src: MUSIC + 'game-mme-claio.mp3',                                 mixes: ['activities'] },
    { id: 'blend-and-snap',        title: 'Down at the Blend & Snap',              artist: 'The Recalls',     src: MUSIC + 'the-laidies-down-at-the-blend-and-snap.mp3',         mixes: ['activities'] },
    { id: 'the-library',           title: 'Welcome to the LIBRAiRY',               artist: 'The Bots',        src: MUSIC + 'dj-jaidy-week-04-the-library.mp3',                     mixes: ['activities'] },
    { id: 'the-newsstand',         title: 'The NewsStand',                         artist: 'The Embeddings',  src: MUSIC + 'sunnyvaile-newsstand.mp3',                           mixes: ['activities'] },

    // Episodes
    { id: 'ep-01',                 title: 'Ep 01 · On Wednesdays We Do AI',                       artist: 'The Regressions', src: MUSIC + 'dj-jaidy-week-01-on-wednesday-we-do-ai.mp3', mixes: ['episodes'] },
    { id: 'ep-02',                 title: 'Ep 02 · Tell Me What You Want',                        artist: 'The Predicts',    src: MUSIC + 'dj-jaidy-week-02-tell-me-what-you-want.mp3', mixes: ['episodes'] },
    { id: 'ep-03',                 title: "Ep 03 · Don't Be Chutney on the Stand",                artist: 'The Overfits',    src: MUSIC + 'dj-jaidy-week-03-dont-be-chutney-on-the-stand.mp3', mixes: ['episodes'] },
    { id: 'ep-04',                 title: 'Ep 04 · It Was Women All Along',                       artist: 'The Priors',      src: MUSIC + 'dj-jaidy-week-04-it-was-women-all-along.mp3', mixes: ['episodes'] },

    // B-side
    { id: 'every-slaiyer-watcher', title: 'Every SLAiYER Needs a Watcher',                       artist: 'The Embeddings',  src: MUSIC + 'dj-jaidy-every-slaiyer-needs-a-watcher.mp3',           mixes: ['bside'] },
    { id: 'impossible',            title: 'Impossible to Underestimate You',                    artist: 'The Overfits',   src: MUSIC + 'dj-jaidy-impossible-to-underestimate-you.mp3',        mixes: ['bside'] },
    { id: 'debs-tomorrow',         title: "Deb's Tomorrow Problem",                              artist: 'The Overfits',   src: MUSIC + 'debs-tomorrow-problem.mp3',                            mixes: ['bside'] }
  ];

  var TRACK_REGISTRY_URL = '/content/music/ksvl-track-registry.json';
  var REGISTRY_ID = 'ksvl-creator-confirmed-tracks-2026-07-26';
  var PUBLIC_RULE = 'Creator-confirmed LAiDIES Suno-original tracks are playable when their exact local MP3 is present and the registry marks it AVAILABLE. A track is held only for a missing, broken, wrong or quality-rejected file.';
  var catalogReady = false;
  var catalogFailure = '';
  var activeRegistryId = '';
  var registryBySrc = {};
  var runtimeTracks = TRACKS.slice();
  var resolveCatalogueReady;
  var catalogueReadyPromise = new Promise(function(resolve) { resolveCatalogueReady = resolve; });
  window.KSVL_whenReady = function() { return catalogueReadyPromise; };

  function safeLocalAudioPath(value) {
    return typeof value === 'string' &&
      /^\/content\/music\/[a-z0-9][a-z0-9_./-]*\.(mp3|m4a|ogg|wav)$/i.test(value) &&
      value.indexOf('..') === -1;
  }

  function safeLocalLesson(value) {
    return value === null ||
      (typeof value === 'string' && /^\/[a-z0-9][a-z0-9_./?=&%-]*$/i.test(value) &&
        value.indexOf('..') === -1);
  }

  function parseIsoDay(value) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
    var parts = value.split('-').map(Number);
    var stamp = Date.UTC(parts[0], parts[1] - 1, parts[2]);
    var date = new Date(stamp);
    if (date.getUTCFullYear() !== parts[0] ||
        date.getUTCMonth() + 1 !== parts[1] ||
        date.getUTCDate() !== parts[2]) return null;
    return stamp;
  }

  function utcToday() {
    var now = new Date();
    return Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  }

  function isAdmissionReady(record) {
    return !!record &&
      record.status === 'AVAILABLE' &&
      record.rightsStatus === 'CREATOR_CONFIRMED_SUNO_ORIGINAL' &&
      record.sourceStatus === 'FILE_PRESENT_VERIFIED';
  }

  function validateRegistry(data) {
    var topKeys = ['schemaVersion', 'registryId', 'updatedAt', 'freshThrough', 'publicRule', 'tracks'];
    var updatedAt = data && parseIsoDay(data.updatedAt);
    var freshThrough = data && parseIsoDay(data.freshThrough);
    var today = utcToday();
    if (!data || Object.keys(data).sort().join('|') !== topKeys.sort().join('|') ||
        data.schemaVersion !== 1 || data.registryId !== REGISTRY_ID ||
        data.publicRule !== PUBLIC_RULE || !Array.isArray(data.tracks) ||
        updatedAt === null || freshThrough === null ||
        updatedAt > today || freshThrough < today || updatedAt > freshThrough ||
        freshThrough > updatedAt + (31 * 24 * 60 * 60 * 1000)) {
      throw new Error('The KSVL catalogue record is missing, stale or malformed.');
    }
    var allowed = ['id','title','artist','src','mixes','status','rightsStatus','sourceStatus','lyricStatus','transcriptStatus','captionStatus','sourceLesson','freshnessOwner','publicNote'];
    var rightsStates = ['CREATOR_CONFIRMED_SUNO_ORIGINAL'];
    var sourceStates = ['FILE_PRESENT_VERIFIED','FILE_MISSING','FILE_BROKEN','FILE_WRONG','QUALITY_REJECTED'];
    var lyricStates = ['AS_RECORDED_LYRICS_APPROVED','AS_RECORDED_LYRICS_MISSING','CANON_EXISTS_REVIEW_REQUIRED','RECONCILIATION_REQUIRED'];
    var transcriptStates = ['AS_RECORDED_TRANSCRIPT_APPROVED','AS_RECORDED_TRANSCRIPT_MISSING','AS_RECORDED_TRANSCRIPT_REVIEW_REQUIRED'];
    var captionStates = ['AS_RECORDED_CAPTIONS_APPROVED','AS_RECORDED_CAPTIONS_MISSING','AS_RECORDED_CAPTIONS_REVIEW_REQUIRED'];
    var seenIds = {};
    var seenSources = {};
    var runtimeById = {};
    runtimeTracks.forEach(function(track) { runtimeById[track.id] = track; });
    data.tracks.forEach(function(record) {
      if (!record || Object.keys(record).sort().join('|') !== allowed.sort().join('|') ||
          !/^[a-z0-9][a-z0-9-]*$/.test(record.id || '') ||
          !String(record.title || '').trim() || !String(record.artist || '').trim() ||
          !safeLocalAudioPath(record.src) || !Array.isArray(record.mixes) ||
          !['AVAILABLE','HOLD','RETIRED'].includes(record.status) ||
          !rightsStates.includes(record.rightsStatus) ||
          !sourceStates.includes(record.sourceStatus) ||
          !lyricStates.includes(record.lyricStatus) ||
          !transcriptStates.includes(record.transcriptStatus) ||
          !captionStates.includes(record.captionStatus) ||
          !safeLocalLesson(record.sourceLesson) || !String(record.freshnessOwner || '').trim() ||
          !String(record.publicNote || '').trim() || seenIds[record.id] || seenSources[record.src]) {
        throw new Error('The KSVL catalogue contains an unsafe or duplicate track record.');
      }
      seenIds[record.id] = true;
      seenSources[record.src] = true;
      var sourceTrack = runtimeById[record.id];
      if (!sourceTrack || sourceTrack.src !== record.src || sourceTrack.title !== record.title ||
          sourceTrack.artist !== record.artist ||
          sourceTrack.mixes.slice().sort().join('|') !== record.mixes.slice().sort().join('|')) {
        throw new Error('The KSVL catalogue and player source do not match at ' + record.id + '.');
      }
    });
    if (data.tracks.length !== runtimeTracks.length) {
      throw new Error('The KSVL catalogue does not cover every public player track.');
    }
    return data;
  }

  function applyRegistry(data) {
    registryBySrc = {};
    data.tracks.forEach(function(record) { registryBySrc[record.src] = record; });
    TRACKS = runtimeTracks.filter(function(track) {
      var record = registryBySrc[track.src];
      return isAdmissionReady(record);
    }).map(function(track) {
      var record = registryBySrc[track.src];
      return Object.assign({}, track, {
        lesson: record.sourceLesson,
        publicNote: record.publicNote,
        registryId: data.registryId
      });
    });
    catalogReady = true;
    activeRegistryId = data.registryId;
  }

  function loadRegistry() {
    return fetch(TRACK_REGISTRY_URL, {cache: 'no-store'}).then(function(response) {
        if (!response.ok) throw new Error('The KSVL catalogue record is unavailable.');
        return response.json();
      })
      .then(function(data) { applyRegistry(validateRegistry(data)); })
      .catch(function(error) {
        TRACKS = [];
        activeRegistryId = '';
        catalogFailure = error && error.message ?
          error.message : 'KSVL could not load the song list.';
        throw error;
      });
  }

  // ---- Mix definitions (order matters — display order in the rack) ----
  var MIXES = [
    { id: 'all',        title: 'All Songs',     sub: 'Everything KSVL has',                     color: 'plum',   labelStyle: 'sharpie' },
    { id: 'anthems',    title: 'Anthems',       sub: 'The town identity tracks',                color: 'gold',   labelStyle: 'sharpie' },
    { id: 'saints',     title: 'PATRON SAiNTS', sub: 'One track per saint',                     color: 'rose',   labelStyle: 'sharpie' },
    { id: 'activities', title: 'Activities',    sub: 'Game themes + hangouts',                  color: 'teal',   labelStyle: 'sharpie' },
    { id: 'episodes',   title: 'Episodes',      sub: 'One original song per issue',             color: 'purple', labelStyle: 'sharpie' },
    { id: 'bside',      title: 'B-side',        sub: "Bonus tracks that don't fit elsewhere",   color: 'aqua',   labelStyle: 'sharpie' }
  ];

  function tracksForMix(mixId) {
    if (mixId === 'all') return TRACKS.slice();
    return TRACKS.filter(function(t) { return t.mixes.indexOf(mixId) >= 0; });
  }

  function isAdmittedSource(src) {
    var record = registryBySrc[src];
    return !!(catalogReady && isAdmissionReady(record));
  }

  // Wrap a track with its DJ SunnyV intro so they play as one atomic queue item
  // (intro → track). Tracks without an `intro` field pass through unchanged.
  function wrapWithIntro(track) {
    if (!track || !track.intro || !isAdmittedSource(track.intro)) return track;
    return {
      title: track.title,
      artist: track.artist,
      parts: [
        { src: track.intro, title: 'DJ SunnyV introduces… ' + track.title, artist: 'DJ SunnyV' },
        { src: track.src,   title: track.title, artist: track.artist }
      ]
    };
  }

  // The live control is a truthful catalogue shuffle while programme objects remain unadmitted.
  var LIVE_MIX = { id: 'live', title: 'KSVL 99.9', sub: 'Live broadcast coming later', color: 'gold', labelStyle: 'sharpie' };

  function startLive() {
    if (sendRemote('live')) return;
    if (!TRACKS.length) {
      announce('KSVL cannot start a track right now. Please try again later.', 'held');
      return;
    }
    state.mixId = 'live';
    state.queue = TRACKS.slice();
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
    + '.ksvl-cd-image { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; padding: 8px; box-sizing: border-box; }'
    + '.ksvl-cd-disc { position: absolute; inset: 0; margin: auto; width: 88%; height: 88%; object-fit: contain; }'
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
    /* Now Playing bar — the KSVL deck. Bright wallpaper casing and mint/lime panels,
       prominent tangerine play button, and a tiny label under every control so no
       button is ever a mystery. */
    + '.ksvl-now-playing { position: fixed; left: 0; right: 0; bottom: 0; background: linear-gradient(110deg, #15bce0 0%, #7de2c2 58%, #b7e42b 100%); border-top: 3px solid #7137d6; color: #202020; padding: 9px 20px 8px; display: none; align-items: center; gap: 16px; z-index: 9997; box-shadow: 0 -10px 30px rgba(7,15,43,0.4); font-family: "Jost", sans-serif; }'
    + '.ksvl-now-playing.is-visible { display: flex; }'
    + '.ksvl-np-info { flex: 1; min-width: 0; }'
    + '.ksvl-np-mix { display: flex; align-items: center; gap: 7px; font-size: 10px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #492878; margin-bottom: 2px; }'
    + '.ksvl-now-playing.is-live .ksvl-np-mix::before { content: ""; flex-shrink: 0; width: 7px; height: 7px; border-radius: 50%; background: #ff4f4f; box-shadow: 0 0 6px rgba(255,79,79,0.9); animation: ksvl-np-onair 1.4s ease-in-out infinite; }'
    + '@keyframes ksvl-np-onair { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }'
    + '@media (prefers-reduced-motion: reduce) { .ksvl-now-playing.is-live .ksvl-np-mix::before { animation: none; } }'
    + '.ksvl-np-track { display: block; font-size: 15px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }'
    + '.ksvl-np-position { font-size: 11px; opacity: 0.7; }'
    + '.ksvl-np-status { display: block; margin-top: 3px; min-height: 1.25em; font-size: 11px; line-height: 1.25; color: #202020; }'
    + '.ksvl-np-up-next { display: block; margin-top: 3px; font-size: 11px; line-height: 1.3; color: #202020; overflow-wrap: anywhere; } .ksvl-np-up-next[hidden] { display: none; }'
    + '.ksvl-np-status[data-kind="routine"] { position: absolute; width: 1px; height: 1px; min-height: 0; padding: 0; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }'
    + '.ksvl-np-storage-limit:not([hidden]) { display:block; margin-top:3px; font-size:11px; line-height:1.25; color:#492878; }'
    + '.ksvl-np-status[data-kind="error"], .ksvl-np-status[data-kind="held"] { color: #492878; }'
    + '.ksvl-np-retry { margin-top: 6px; min-height: 44px; padding: 8px 14px; border: 1px solid #492878; border-radius: 999px; background: transparent; color: #202020; font: 800 11px/1 "Jost", sans-serif; cursor: pointer; }'
    + '.ksvl-np-controls { display: flex; align-items: flex-start; flex-wrap: wrap; }'
    + '.ksvl-np-group { display: flex; align-items: flex-start; gap: 3px; }'
    + '.ksvl-np-group + .ksvl-np-group { margin-left: 12px; padding-left: 14px; border-left: 1px solid rgba(73,40,120,0.3); }'
    + '.ksvl-np-btn { display: inline-flex; flex-direction: column; align-items: center; justify-content: center; min-width: 44px; min-height: 44px; gap: 3px; background: transparent; border: 0; color: #202020; cursor: pointer; padding: 2px 3px; font-family: inherit; text-decoration: none; }'
    + '.ksvl-np-btn:focus { outline: none; }'
    + '.ksvl-now-playing :is(button,a,input):focus-visible { outline: 2px solid #492878; outline-offset: 3px; }'
    + '.ksvl-np-ico { display: inline-flex; align-items: center; justify-content: center; width: 33px; height: 33px; border-radius: 50%; background: rgba(255,253,251,0.35); border: 1.5px solid #492878; font-size: 13px; line-height: 1; transition: background 0.15s ease, border-color 0.15s ease, transform 0.12s ease; text-shadow: none; }'
    + '.ksvl-np-btn:hover .ksvl-np-ico, .ksvl-np-btn:focus-visible .ksvl-np-ico { background: rgba(255,253,251,0.28); border-color: #492878; transform: translateY(-1px); }'
    + '.ksvl-np-sound { align-items: flex-end; }'
    + '.ksvl-np-slider-field { display: flex; flex-direction: column; min-width: 0; color: #202020; }'
    + '.ksvl-np-field-heading { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 2px 8px; font: 700 11px/1.3 "Jost", sans-serif; }'
    + '.ksvl-np-time { font-variant-numeric: tabular-nums; font-weight: 500; white-space: nowrap; }'
    + '.ksvl-np-slider-field:has(.ksvl-np-volume) { width: 92px; } .ksvl-np-slider-field:has(.ksvl-np-seek) { width: min(190px,24vw); }'
    + '@media (max-width:620px) { .ksvl-np-slider-field:has(.ksvl-np-seek) { width:132px; } .ksvl-np-field-heading { min-height:31px; align-content:flex-start; } }'
    + '.ksvl-np-volume, .ksvl-np-seek { min-height: 44px; accent-color: #492878; }'
    + '.ksvl-np-volume { width: 92px; } .ksvl-np-seek { width: min(190px, 24vw); }'
    + '.ksvl-np-lbl { font-size: 7.5px; font-weight: 800; letter-spacing: 0.13em; text-transform: uppercase; opacity: 0.72; white-space: nowrap; }'
    + '.ksvl-np-btn:hover .ksvl-np-lbl { opacity: 1; }'
    + '.ksvl-np-btn--play .ksvl-np-ico { width: 46px; height: 46px; background: #ff9b3d; border-color: #492878; color: #202020; font-size: 18px; text-shadow: none; box-shadow: 0 4px 12px rgba(0,0,0,0.32); }'
    + '.ksvl-np-btn--play:hover .ksvl-np-ico { background: #fffdfb; border-color: #202020; }'
    + '.ksvl-np-btn--play .ksvl-np-lbl { color: #492878; opacity: 0.95; }'
    + '.ksvl-np-btn--toggle .ksvl-np-ico { opacity: 0.8; }'
    + '.ksvl-np-btn--toggle.is-active .ksvl-np-ico { opacity: 1; background: rgba(113,55,214,0.18); border-color: #492878; }'
    + '.ksvl-np-btn--toggle.is-active .ksvl-np-lbl { opacity: 1; color: #492878; }'
    + '.ksvl-np-btn--stop:hover .ksvl-np-ico { border-color: #492878; color: #492878; background: rgba(113,55,214,0.18); }'
    + '@media (max-width: 860px) { .ksvl-np-lbl { display: none; } .ksvl-np-group + .ksvl-np-group { margin-left: 6px; padding-left: 8px; } }'
    + '@media (max-width: 620px) { .ksvl-np-info .ksvl-np-position { display: block; } .ksvl-now-playing { padding: 8px 12px; gap: 6px; flex-wrap: wrap; } .ksvl-np-info { flex: 1 1 calc(100% - 54px); } .ksvl-np-controls { flex: 1 1 100%; justify-content: center; gap: 4px; } .ksvl-np-group + .ksvl-np-group { margin: 0; padding: 0; border: 0; } .ksvl-np-ico { width: 31px; height: 31px; } .ksvl-np-btn--play .ksvl-np-ico { width: 42px; height: 42px; } .ksvl-np-seek { width: 132px; } }';

  // Rewind artwork is a real image; CSS only frames readable working panels.
  STYLE += '.ksvl-now-playing { box-sizing:border-box; background:#c195e9 url("/assets/homepage/rewind-wallpaper-20260906.webp") repeat center center / 380px 380px; border-top:3px solid #492878; padding:12px 16px; gap:12px; align-items:stretch; box-shadow:0 -4px 14px rgba(40,20,65,.2); }'
    + '.ksvl-np-info { padding:12px 16px; border:2px solid #492878; border-radius:12px; background:#7de2c2; box-shadow:3px 3px 0 #492878; }'
    + '.ksvl-np-track { font-size:19px; line-height:1.2; font-weight:800; white-space:normal; overflow-wrap:anywhere; } .ksvl-np-position { font-size:12px; opacity:1; } .ksvl-np-up-next { font-size:12px; margin-top:5px; line-height:1.3; }'
    + '.ksvl-np-mix { font-size:10px; letter-spacing:.14em; margin-bottom:5px; } .ksvl-now-playing.is-live .ksvl-np-mix::before { display:none; }'
    + '.ksvl-np-controls { padding:10px 12px; border:2px solid #492878; border-radius:12px; background:#b7e42b; box-shadow:3px 3px 0 #492878; gap:12px; align-items:center; flex-wrap:nowrap; }'
    + '.ksvl-np-extras { display:flex; align-items:center; gap:10px; } .ksvl-np-group + .ksvl-np-group { margin:0; padding:0; border:0; }'
    + '.ksvl-np-lbl { display:block; font-size:9px; letter-spacing:.04em; opacity:1; } .ksvl-np-ico { background:#7de2c2; border-width:2px; } .ksvl-np-btn--play .ksvl-np-ico { width:46px; height:46px; background:#ff9b3d; }'
    + '.ksvl-np-more { display:none; min-height:44px; border:2px solid #492878; border-radius:8px; padding:7px 10px; background:#c195e9; color:#24152f; font:700 12px/1.2 Jost,sans-serif; cursor:pointer; }'
    + '.ksvl-np-field-heading { min-height:0; font-size:11px; } .ksvl-np-progress-field { width:180px!important; } .ksvl-np-progress-field input { width:100%; margin-inline:0; }'
    + '@media(max-width:1100px) { .ksvl-now-playing { flex-wrap:wrap; } .ksvl-np-info { flex:1 1 100%; } .ksvl-np-controls { flex:1 1 100%; justify-content:center; } }'
    + '@media(max-width:620px) { .ksvl-now-playing { padding:8px; gap:7px; max-height:85dvh; overflow-y:auto; } .ksvl-np-info { padding:9px 12px; } .ksvl-np-track { font-size:17px; } .ksvl-np-info .ksvl-np-position { display:block; } .ksvl-np-mix { font-size:9px; margin-bottom:3px; } .ksvl-np-up-next { font-size:11px; margin-top:3px; }'
    + '.ksvl-np-controls { display:grid; grid-template-columns:1fr auto; padding:7px 10px; gap:3px 8px; } .ksvl-np-deck { justify-content:flex-start; gap:8px; } .ksvl-np-more { display:block; } .ksvl-np-progress-field { grid-column:1 / -1; width:100%!important; } .ksvl-np-field-heading { min-height:0; flex-wrap:nowrap; } .ksvl-np-progress-field input { min-height:32px; }'
    + '.ksvl-np-extras { display:none; grid-column:1 / -1; flex-wrap:wrap; justify-content:center; gap:6px 12px; padding-top:6px; border-top:1px solid #492878; } .ksvl-now-playing.is-expanded .ksvl-np-extras { display:flex; } .ksvl-np-extras .ksvl-np-slider-field { width:92px; } .ksvl-np-lbl { font-size:9px; } .ksvl-np-ico { width:30px; height:30px; } .ksvl-np-btn--play .ksvl-np-ico { width:38px; height:38px; } }';

  // The sitewide default is a compact strip; full controls open on demand.
  STYLE += '.ksvl-np-more { display:block; } .ksvl-np-extras { display:none; } .ksvl-now-playing.is-expanded .ksvl-np-extras { display:flex; }'
    + '.ksvl-now-playing:not(.is-expanded) { padding:5px 10px; gap:8px; flex-wrap:nowrap; align-items:center; border-top-width:3px; }'
    + '.ksvl-now-playing:not(.is-expanded) .ksvl-np-info { flex:1 1 0; min-width:0; padding:5px 10px; border:0; border-radius:6px; box-shadow:none; }'
    + '.ksvl-now-playing:not(.is-expanded) .ksvl-np-mix, .ksvl-now-playing:not(.is-expanded) .ksvl-np-up-next { display:none; }'
    + '.ksvl-now-playing:not(.is-expanded) .ksvl-np-track { display:block; font-size:12px; line-height:1.25; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }'
    + '.ksvl-now-playing:not(.is-expanded) .ksvl-np-position { display:block; font-size:10px; line-height:1.3; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }'
    + '.ksvl-now-playing:not(.is-expanded) .ksvl-np-controls { display:flex; flex:0 0 auto; gap:8px; padding:2px 6px; border:0; border-radius:6px; box-shadow:none; }'
    + '.ksvl-now-playing:not(.is-expanded) .ksvl-np-deck { gap:4px; } .ksvl-now-playing:not(.is-expanded) .ksvl-np-ico { width:28px; height:28px; }'
    + '.ksvl-now-playing:not(.is-expanded) .ksvl-np-btn--play .ksvl-np-ico { width:32px; height:32px; } .ksvl-now-playing:not(.is-expanded) .ksvl-np-lbl { font-size:8px; }'
    + '.ksvl-now-playing:not(.is-expanded) .ksvl-np-more { padding:4px 7px; font-size:11px; }'
    + '@media(max-width:900px) { .ksvl-now-playing:not(.is-expanded) .ksvl-np-progress-field { display:none; } }'
    + '@media(max-width:620px) { .ksvl-now-playing:not(.is-expanded) { padding:4px; gap:4px; } .ksvl-now-playing:not(.is-expanded) .ksvl-np-info { padding:6px; } .ksvl-now-playing:not(.is-expanded) .ksvl-np-controls { gap:3px; padding:2px; } .ksvl-now-playing:not(.is-expanded) .ksvl-np-deck > :first-child, .ksvl-now-playing:not(.is-expanded) .ksvl-np-deck > :last-child { display:flex; } }';

  STYLE += '.ksvl-now-playing:not(.is-expanded) { justify-content:center; background:#7de2c2; border-top:5px solid #c195e9; box-shadow:0 -2px 8px rgba(40,20,65,.16); }'
    + '.ksvl-now-playing:not(.is-expanded) .ksvl-np-info, .ksvl-now-playing:not(.is-expanded) .ksvl-np-controls { background:transparent; border-radius:0; }'
    + '.ksvl-now-playing:not(.is-expanded) .ksvl-np-info { flex:0 1 220px; margin-right:0; }'
    + '@media(max-width:620px) { .ksvl-now-playing:not(.is-expanded) .ksvl-np-info { flex:0 1 150px; } }';

  STYLE += '.ksvl-np-title-text { display:inline-block; } .ksvl-now-playing:not(.is-expanded) .ksvl-np-track { overflow:hidden; text-overflow:clip; }'
    + '.ksvl-now-playing:not(.is-expanded) .ksvl-np-track.has-overflow .ksvl-np-title-text { animation:ksvl-title-scroll 14s linear infinite alternate; }'
    + '@keyframes ksvl-title-scroll { 0%,20% { transform:translateX(0); } 80%,100% { transform:translateX(var(--title-travel,0px)); } }'
    + '@media(prefers-reduced-motion:reduce) { .ksvl-np-title-text { animation:none!important; } }'
    + '.ksvl-now-playing:not(.is-expanded) .ksvl-np-sound .ksvl-np-slider-field { width:80px; } .ksvl-now-playing:not(.is-expanded) .ksvl-np-volume { width:100%; }'
    + '@media(max-width:620px) { .ksvl-now-playing:not(.is-expanded) { flex-wrap:wrap; gap:0; } .ksvl-now-playing:not(.is-expanded) .ksvl-np-info { flex:1 1 100%; display:flex; align-items:center; gap:10px; padding:2px 6px; } .ksvl-now-playing:not(.is-expanded) .ksvl-np-track { flex:1; min-width:0; } .ksvl-now-playing:not(.is-expanded) .ksvl-np-position { max-width:40%; } .ksvl-now-playing:not(.is-expanded) .ksvl-np-controls { flex:1 1 100%; justify-content:center; gap:4px; } .ksvl-now-playing:not(.is-expanded) .ksvl-np-sound > .ksvl-np-btn { display:flex; } .ksvl-now-playing:not(.is-expanded) .ksvl-np-sound .ksvl-np-slider-field { width:65px; } .ksvl-now-playing.is-expanded .ksvl-np-sound { grid-column:1 / -1; justify-content:center; } }';

  // Preserve the illustrated identity; only phones need disclosure.
  STYLE += '.ksvl-now-playing:not(.is-expanded) { background:#c195e9 url("/assets/homepage/rewind-wallpaper-20260906.webp") repeat center /380px 380px; border-top:3px solid #492878; }'
    + '.ksvl-now-playing:not(.is-expanded) .ksvl-np-info { background:#7de2c2; border-radius:7px; } .ksvl-now-playing:not(.is-expanded) .ksvl-np-controls { background:#b7e42b; border-radius:7px; }'
    + '@media(min-width:621px) { .ksvl-now-playing { flex-wrap:nowrap; align-items:stretch; } .ksvl-np-more { display:none!important; } .ksvl-now-playing .ksvl-np-extras { display:flex; flex-wrap:wrap; justify-content:center; gap:6px; } .ksvl-now-playing:not(.is-expanded) .ksvl-np-info { flex:0 1 220px; display:flex; flex-direction:column; justify-content:center; } .ksvl-now-playing:not(.is-expanded) .ksvl-np-controls { flex:0 1 auto; flex-wrap:wrap; justify-content:center; padding:4px 8px; gap:8px; } .ksvl-now-playing:not(.is-expanded) .ksvl-np-up-next { display:block; font-size:10px; margin-top:3px; } .ksvl-now-playing:not(.is-expanded) .ksvl-np-progress-field { display:flex; width:150px!important; } }';

  STYLE += '.ksvl-now-playing .ksvl-np-field-heading { justify-content:center; text-align:center; transform:translateY(9px); pointer-events:none; }'
    + '.ksvl-now-playing .ksvl-np-time { display:block; text-align:center; font-size:9px; line-height:1; margin-top:-6px; } .ksvl-np-btn--play .ksvl-np-ico svg { display:block; flex:none; }';

  STYLE += '@media(max-width:620px) { .ksvl-np-more { grid-column:2; grid-row:1; } .ksvl-now-playing:not(.is-expanded) .ksvl-np-more { margin-left:auto; } }';

  STYLE += '.ksvl-now-playing:not(.is-expanded) .ksvl-np-sound { display:contents; } .ksvl-now-playing:not(.is-expanded) .ksvl-np-ico { width:32px; height:32px; }';

  STYLE += '.ksvl-now-playing, .ksvl-now-playing * { font-weight:400!important; } .ksvl-now-playing .ksvl-np-track, .ksvl-now-playing .ksvl-np-title-text { font-weight:700!important; }';

  STYLE += '.ksvl-now-playing .ksvl-np-position strong, .ksvl-now-playing .ksvl-np-controls, .ksvl-now-playing .ksvl-np-controls * { font-weight:700!important; }';

  STYLE += '.ksvl-now-playing.is-finished .ksvl-np-up-next { display:block!important; }';

  function updateTitleOverflow() {
    if (!npTrack || !npTrack.firstElementChild) return;
    var overflow = npTrack.firstElementChild.scrollWidth - npTrack.clientWidth;
    npTrack.classList.toggle('has-overflow', overflow > 2);
    npTrack.style.setProperty('--title-travel', -Math.max(0, overflow) + 'px');
  }

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
    finished: false,
    startTrackId: null,
    nextChoice: null,     // reserve shuffle once for preview, preload and playback
    paused: false,
    shuffle: false,
    repeatMode: 'all',    // 'off' | 'all' | 'one'
    volume: 0.8,
    muted: false,
    restoring: false,
    lastFailure: null,
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

  // One resolver owns the actual next item, including multipart intros/spots.
  function nextInFlow() {
    var track = state.queue[state.index];
    if (!track || state.finished) return null;
    if (track.parts && state.currentPart < track.parts.length - 1) {
      return {index: state.index, part: state.currentPart + 1, item: track.parts[state.currentPart + 1]};
    }
    if (state.signingOff || state.mixId === 'single') return null;
    var index;
    if (state.repeatMode === 'one') index = state.index;
    else if (state.shuffle) {
      var choice = state.nextChoice;
      if (!choice || choice.queue !== state.queue || choice.from !== state.index) {
        choice = {queue: state.queue, from: state.index, index: Math.floor(Math.random() * state.queue.length)};
        state.nextChoice = choice;
      }
      index = choice.index;
    } else if (state.repeatMode === 'off' && state.index >= state.queue.length - 1) return null;
    else index = (state.index + 1) % state.queue.length;
    var next = state.queue[index];
    return next ? {index: index, part: 0, item: next.parts && next.parts.length ? next.parts[0] : next} : null;
  }

  function nextTitle() {
    var next = nextInFlow();
    return next && next.item ? next.item.title || state.queue[next.index].title : '';
  }

  function updateUpNext() {
    if (!npUpNext) return;
    var title = remoteOwner ? remoteOwner.upNextTitle : nextTitle();
    // Older remote players cannot promise a shuffled choice they have not made.
    npUpNext.hidden = typeof title !== 'string';
    npUpNext.textContent = typeof title !== 'string' ? '' : state.finished ? 'Finished' : title ? 'Up next: “' + title + '”' : 'Last song';
  }


  var np, npMix, npTrack, npPosition, npStatus, npUpNext, npRetry, npPlayBtn,
    npShuffleBtn, npRepeatBtn, npMuteBtn, npVolume, npSeek, npTime, npStorageLimit;
  var storageLimit = '';
  function reportStorageLimit() {
    storageLimit = 'Browser storage is unavailable. Music can play here, but may not follow you to another page or keep your position.';
    if (npStorageLimit) { npStorageLimit.textContent = storageLimit; npStorageLimit.hidden = false; }
  }
  function checkContinuityStorage() {
    try {
      [localStorage, sessionStorage].forEach(function(storage) {
        var key = 'laidies_ksvl_storage_probe_v2';
        storage.setItem(key, '1'); storage.removeItem(key);
      });
    } catch (e) { reportStorageLimit(); }
  }

  function announce(message, kind, quiet) {
    ensureNowPlaying();
    npStatus.textContent = message || '';
    npStatus.dataset.kind = quiet || kind === 'playing' ? 'routine' : kind || 'status';
    npRetry.hidden = kind !== 'error';
    if (kind === 'error') {
      window.requestAnimationFrame(function() { npRetry.focus(); });
    }
    np.classList.add('is-visible');
  }

  function retryCurrent() {
    if (sendRemote('retry')) return;
    if (!state.lastFailure || !state.queue.length) return;
    state.lastFailure = null;
    announce('Trying that track again…', 'loading');
    playCurrentPart();
  }

  // Every control = round icon + tiny label underneath, so no button is a
  // mystery. Icon glyphs are swapped via setBtnIcon (labels survive).
  function npButton(extraClass, glyph, label, attrs) {
    attrs = attrs || {};
    attrs.class = 'ksvl-np-btn' + (extraClass ? ' ' + extraClass : '');
    if (!attrs.href) attrs.type = 'button';
    return el(attrs.href ? 'a' : 'button', attrs, [
      el('span', {class: 'ksvl-np-ico', text: glyph, 'aria-hidden': 'true'}),
      el('span', {class: 'ksvl-np-lbl', text: label, 'aria-hidden': 'true'})
    ]);
  }
  function setBtnIcon(btn, glyph) {
    if (!btn) return;
    var ico = btn.querySelector('.ksvl-np-ico');
    if (ico && btn.classList.contains('ksvl-np-btn--play')) {
      ico.textContent = '';
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 24 24');
      svg.setAttribute('width', '20'); svg.setAttribute('height', '20');
      svg.setAttribute('aria-hidden', 'true');
      var shape = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      shape.setAttribute('d', glyph === '▶' ? 'M8 4 L21 12 L8 20 Z' : 'M6 5H10V19H6Z M14 5H18V19H14Z');
      shape.setAttribute('fill', 'currentColor'); svg.appendChild(shape); ico.appendChild(svg);
    } else if (ico) ico.textContent = glyph; else btn.textContent = glyph;
  }
  function setBtnLabel(btn, label) {
    if (!btn) return;
    var lbl = btn.querySelector('.ksvl-np-lbl');
    if (lbl) lbl.textContent = label;
  }

  function ensureNowPlaying() {
    if (np) return np;
    np = el('div', {class: 'ksvl-now-playing'});
    var info = el('div', {class: 'ksvl-np-info'});
    npMix = el('span', {class: 'ksvl-np-mix'});
    npTrack = el('span', {class: 'ksvl-np-track'});
    if (typeof ResizeObserver === 'function') new ResizeObserver(updateTitleOverflow).observe(npTrack);
    npPosition = el('span', {class: 'ksvl-np-position'});
    npStatus = el('span', {
      class: 'ksvl-np-status',
      role: 'status',
      'aria-live': 'polite',
      'aria-atomic': 'true',
      text: 'KSVL is ready for an explicit listening choice.'
    });
    npRetry = el('button', {
      class: 'ksvl-np-retry',
      type: 'button',
      text: 'Retry this track',
      hidden: 'hidden',
      onclick: retryCurrent
    });
    info.appendChild(npMix);
    info.appendChild(npTrack);
    info.appendChild(npPosition);
    npUpNext = el('span', {class: 'ksvl-np-up-next'});
    info.appendChild(npUpNext);
    info.appendChild(npStatus);
    npStorageLimit = el('span', {class: 'ksvl-np-storage-limit', role: 'status', text: storageLimit});
    npStorageLimit.hidden = !storageLimit;
    info.appendChild(npStorageLimit);
    info.appendChild(npRetry);
    var controls = el('div', {class: 'ksvl-np-controls'});
    // Group 1 — the deck: shuffle · back · PLAY · next · repeat
    var deck = el('div', {class: 'ksvl-np-group ksvl-np-deck'});
    npShuffleBtn = npButton('ksvl-np-btn--toggle', '🔀', 'Shuffle', {'aria-label': 'Shuffle · off', title: 'Shuffle', onclick: toggleShuffle});
    var prev = npButton('', '⏮', 'Back', {'aria-label': 'Previous track', title: 'Previous track', onclick: prevTrack});
    npPlayBtn = npButton('ksvl-np-btn--play', '⏸', 'Pause', {'aria-label': 'Pause', title: 'Listen / Pause', onclick: togglePlay});
    var next = npButton('', '⏭', 'Next', {'aria-label': 'Next track', title: 'Next track', onclick: nextTrack});
    npRepeatBtn = npButton('ksvl-np-btn--toggle is-active', '🔁', 'Repeat', {'aria-label': 'Repeat all', title: 'Repeat', onclick: cycleRepeat});
    deck.appendChild(prev);
    deck.appendChild(npPlayBtn);
    deck.appendChild(next);
    controls.appendChild(deck);
    var more = el('button', {type: 'button', class: 'ksvl-np-more',
      'aria-expanded': 'false', 'aria-controls': 'ksvl-np-extras', text: 'Expand',
      onclick: function() {
        var open = np.classList.toggle('is-expanded');
        more.setAttribute('aria-expanded', String(open));
        more.textContent = open ? 'Collapse' : 'Expand';
      }
    });
    var extras = el('div', {class: 'ksvl-np-extras', id: 'ksvl-np-extras'});
    var modes = el('div', {class: 'ksvl-np-group ksvl-np-modes'}, [npShuffleBtn, npRepeatBtn]);
    extras.appendChild(modes);
    var sound = el('div', {class: 'ksvl-np-group ksvl-np-sound'});
    npMuteBtn = npButton('', '🔊', 'Mute', {'aria-label': 'Mute', title: 'Mute', onclick: toggleMute});
    npVolume = el('input', {
      class: 'ksvl-np-volume',
      type: 'range',
      min: '0',
      max: '1',
      step: '0.05',
      value: String(state.volume),
      'aria-label': 'Volume'
    });
    npVolume.addEventListener('input', setVolumeFromControl);
    npSeek = el('input', {
      class: 'ksvl-np-seek',
      type: 'range',
      min: '0',
      max: '1000',
      step: '1',
      value: '0',
      'aria-label': 'Track progress',
      disabled: 'disabled'
    });
    npSeek.addEventListener('change', seekFromControl);
    sound.appendChild(npMuteBtn);
    var volumeField = el('label', {class: 'ksvl-np-slider-field'}, [
      el('span', {class: 'ksvl-np-field-heading', text: 'Volume'}), npVolume
    ]);
    npTime = el('span', {class: 'ksvl-np-time', text: '0:00 / —:—', 'aria-hidden': 'true'});
    var progressField = el('label', {class: 'ksvl-np-slider-field'}, [
      el('span', {class: 'ksvl-np-field-heading'}, [
        el('span', {text: 'Track progress'})
      ]), npSeek, npTime
    ]);
    sound.appendChild(volumeField);
    progressField.classList.add('ksvl-np-progress-field');
    controls.appendChild(progressField);
    controls.appendChild(sound);
    controls.appendChild(more);
    // Group 2 — station: pop out · KSVL · stop
    var station = el('div', {class: 'ksvl-np-group'});
    if (!IS_POPUP) {
      station.appendChild(npButton('ksvl-np-btn--link', '⧉', 'Pop out', {'aria-label': 'Pop out the player — music continues while you browse', title: 'Pop out — music continues while you browse', onclick: popOutPlayer}));
    }
    station.appendChild(npButton('ksvl-np-btn--link', '📻', 'KSVL', {href: '/radio.html', 'aria-label': 'Go to KSVL Radio', title: 'Open KSVL Radio'}));
    station.appendChild(npButton('ksvl-np-btn--stop', '✕', 'Stop & close', {'aria-label': 'Stop music and close player', title: 'Stop music, close player and clear saved position', onclick: stopPlayer}));
    extras.appendChild(station);
    controls.appendChild(extras);
    np.appendChild(info);
    np.appendChild(controls);
    document.body.appendChild(np);
    var spacer = el('div', {'aria-hidden': 'true', class: 'ksvl-player-space'});
    document.body.appendChild(spacer);
    if (typeof ResizeObserver === 'function') {
      new ResizeObserver(function() { spacer.style.height = np.getBoundingClientRect().height + 'px'; }).observe(np);
    }
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
    if (state.mixId === 'single') {
      label = 'Now listening';
    } else if (state.mixId === 'live') {
      label = 'KSVL 99.9 · Now playing';
    } else if (state.mixId && state.mixId.indexOf('album:') === 0) {
      var albumArtist = state.mixId.slice(6);
      label = albumArtist + ' · Track ' + (state.index + 1) + ' / ' + state.queue.length;
    } else {
      label = (mix ? mix.title : 'KSVL') + ' · Track ' + (state.index + 1) + ' / ' + state.queue.length;
    }
    npMix.textContent = label;
    updateUpNext();
    // Show the current part's label if this is a multi-part track (intro/spot pair).
    var displayTitle = (track.parts && part && part.title) ? part.title : track.title;
    var displayArtist = (track.parts && part && part.artist) ? part.artist : track.artist;
    npTrack.title = displayTitle;
    npPosition.title = displayArtist;
    var titleText = ((track.parts && part && part.artist === 'DJ SunnyV') ? 'Now: ' : 'Song: ') + displayTitle;
    if (!npTrack.firstElementChild || npTrack.firstElementChild.textContent !== titleText) {
      npTrack.textContent = '';
      npTrack.appendChild(el('span', {class:'ksvl-np-title-text', text:titleText}));
    }
    requestAnimationFrame(updateTitleOverflow);
    npPosition.textContent = '';
    npPosition.appendChild(el('strong', {text: (track.parts && part && part.artist === 'DJ SunnyV') ? 'Host: ' : 'Band: '}));
    npPosition.appendChild(document.createTextNode(displayArtist));
    setBtnIcon(npPlayBtn, state.paused ? '▶' : '⏸');
    setBtnLabel(npPlayBtn, state.finished ? 'Play again' : state.paused ? 'Resume' : 'Pause');
    npPlayBtn.setAttribute('aria-label', state.finished ? 'Play again' : state.paused ? 'Resume' : 'Pause');
    np.classList.toggle('is-finished', !!state.finished);
    npShuffleBtn.classList.toggle('is-active', state.shuffle);
    npShuffleBtn.setAttribute('aria-label', state.shuffle ? 'Shuffle · on' : 'Shuffle · off');
    npRepeatBtn.classList.toggle('is-active', state.repeatMode !== 'off');
    npRepeatBtn.setAttribute('aria-label', state.repeatMode === 'off' ? 'Repeat off' : state.repeatMode === 'one' ? 'Repeat one' : 'Repeat all');
    setBtnIcon(npRepeatBtn, state.repeatMode === 'one' ? '🔂' : '🔁');
    np.classList.toggle('is-live', state.mixId === 'live');
    np.classList.add('is-visible');
    updateCDPlayingClass();
    updateMediaSession(displayTitle, displayArtist);
    if (!remoteOwner) saveState();
  }

  function formatTrackTime(value) {
    if (!Number.isFinite(value) || value < 0) return '—:—';
    var total = Math.floor(value);
    var hours = Math.floor(total / 3600);
    var minutes = Math.floor((total % 3600) / 60);
    var seconds = String(total % 60).padStart(2, '0');
    return hours ? hours + ':' + String(minutes).padStart(2, '0') + ':' + seconds : minutes + ':' + seconds;
  }

  function syncSoundControls() {
    var sound = remoteOwner ? {
      muted: state.muted, volume: state.volume,
      duration: remoteOwner.duration, currentTime: remoteOwner.playback.currentTime
    } : state.audio;
    if (!sound) return;
    if (npMuteBtn) {
      setBtnIcon(npMuteBtn, sound.muted ? '🔇' : '🔊');
      setBtnLabel(npMuteBtn, sound.muted ? 'Unmute' : 'Mute');
      npMuteBtn.setAttribute('aria-label', sound.muted ? 'Unmute' : 'Mute');
    }
    if (npVolume) {
      npVolume.value = String(sound.volume);
      npVolume.setAttribute('aria-valuetext', Math.round(sound.volume * 100) + ' percent');
    }
    if (npSeek) {
      var duration = Number(sound.duration);
      npSeek.disabled = !Number.isFinite(duration) || duration <= 0;
      var elapsed = formatTrackTime(Math.max(0, Number(sound.currentTime) || 0));
      var total = npSeek.disabled ? '—:—' : formatTrackTime(duration);
      if (npTime) npTime.textContent = elapsed + ' / ' + total;
      npSeek.setAttribute('aria-valuetext', npSeek.disabled ? 'Track duration unavailable' : elapsed + ' of ' + total);
      npSeek.value = npSeek.disabled ? '0' :
        String(Math.round((sound.currentTime / duration) * 1000));
    }
  }

  function toggleMute() {
    if (sendRemote('mute')) return;
    if (!state.audio) return;
    state.audio.muted = !state.audio.muted;
    state.muted = state.audio.muted;
    announce(state.audio.muted ? 'KSVL is muted.' : 'KSVL sound is on.', 'status', true);
    syncSoundControls();
    saveState();
  }

  function setVolumeFromControl() {
    var value = Math.max(0, Math.min(1, Number(npVolume.value)));
    if (sendRemote('volume', value)) return;
    state.volume = value;
    if (state.audio) {
      state.audio.volume = value;
      if (value > 0 && state.audio.muted) state.audio.muted = false;
      state.muted = state.audio.muted;
    }
    announce('Volume ' + Math.round(value * 100) + ' percent on this device.', 'status', true);
    syncSoundControls();
    saveState();
  }

  function seekFromControl() {
    if (sendRemote('seek', Number(npSeek.value) / 1000)) return;
    if (!state.audio || !Number.isFinite(state.audio.duration) || state.audio.duration <= 0) {
      announce('This track does not provide usable seek metadata.', 'error');
      return;
    }
    try {
      state.audio.currentTime = (Number(npSeek.value) / 1000) * state.audio.duration;
      announce('Moved within ' + ((currentPart() || {}).title || 'the current track') + '.', 'status', true);
    } catch (error) {
      announce('The browser could not seek in this track. Playback position was not changed.', 'error');
    }
  }

  // ---- System media controls (Media Session API) ----
  // Puts the current KSVL track on the lock screen / AirPods / keyboard
  // media keys with station artwork, and helps phones keep the broadcast
  // alive in the background like a real audio app.
  var mediaSessionArmed = false;
  function updateMediaSession(title, artist) {
    if (!('mediaSession' in navigator) || typeof MediaMetadata === 'undefined') return;
    try {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: title || 'KSVL 99.9',
        artist: artist || 'SUNNYVAiLE Community RAiDIO',
        album: 'KSVL 99.9 · SUNNYVAiLE Community RAiDIO'
      });
      navigator.mediaSession.playbackState = state.paused ? 'paused' : 'playing';
      if (!mediaSessionArmed) {
        mediaSessionArmed = true;
        navigator.mediaSession.setActionHandler('play', function() { if (state.paused) togglePlay(); });
        navigator.mediaSession.setActionHandler('pause', function() { if (!state.paused) togglePlay(); });
        navigator.mediaSession.setActionHandler('nexttrack', function() { nextTrack(); });
        navigator.mediaSession.setActionHandler('previoustrack', function() { prevTrack(); });
      }
    } catch (e) { /* older browsers — skip quietly */ }
  }

  function stopExistingAudio() {
    if (state.audio) {
      try { state.audio.pause(); } catch(e) {}
      state.audio = null;
    }
    // Also pause any other <audio> elements from other players (e.g. individual saint buttons)
    document.querySelectorAll('audio, video').forEach(function(a) {
      if (a.tagName === 'VIDEO' && a.muted) return;
      try { a.pause(); } catch(e) {}
    });
    // And stop any playing standalone ♪ song button (they use detached
    // Audio objects the selector above can't see).
    stopActiveThemeBtn();
  }

  // ---- One deck at a time ----
  // The standalone ♪ buttons (saint songs, page themes — window.playLaidiesTheme
  // on ~17 pages) and the station must never play over each other. Wrapping the
  // page's playLaidiesTheme gives us both directions: pressing ♪ pauses the
  // station (it resumes when the song ends), and starting the station stops
  // whatever ♪ button is playing.
  var themeBtnActive = null;
  function stopActiveThemeBtn() {
    var t = themeBtnActive;
    themeBtnActive = null;
    if (t && t.btn && t.btn.classList.contains('is-playing')) {
      try { t.orig(t.btn); } catch(e) {} // the originals toggle: same btn = stop
    }
  }
  function wrapThemePlayer() {
    var orig = window.playLaidiesTheme;
    if (!orig || orig.__ksvlWrapped) return;
    var wrapped = function(btn) {
      var starting = btn && !btn.classList.contains('is-playing');
      var stationWasOn = !!(state.audio && !state.paused);
      var r = orig(btn);
      if (starting && btn && btn.classList.contains('is-playing')) {
        themeBtnActive = { btn: btn, orig: orig };
        if (stationWasOn) {
          try { state.audio.pause(); } catch(e) {}
          state.paused = true;
          if (state.mutedAutoplay) { state.mutedAutoplay = false; try { state.audio.muted = false; } catch(e) {} }
          updateNowPlaying();
          hideResumeNudge();
          // A different listening choice never schedules a surprise KSVL resume.
        }
      }
      return r;
    };
    wrapped.__ksvlWrapped = true;
    window.playLaidiesTheme = wrapped;
  }

  // ---- Keep the station rolling between pages ----
  // Browsers block autoplay-with-sound on a fresh page load, but MUTED
  // playback is always allowed. So the station keeps broadcasting silently
  // (real radio doesn't pause for you) and the visitor's first interaction
  // anywhere brings the sound back mid-song. If even muted play is blocked,
  // fall back to the honest paused state with the same one-tap resume.
  var gestureArmed = false;
  var NUDGE_ID = 'ksvl-resume-nudge';
  // The paused-by-the-browser state is invisible unless we say something —
  // listeners just hear the music stop. Show a pill above the player bar.
  function showResumeNudge(text) {
    var existing = document.getElementById(NUDGE_ID);
    if (existing) { existing.textContent = text || existing.textContent; return; }
    if (!document.body) return;
    if (!document.getElementById('ksvl-nudge-style')) {
      var st = document.createElement('style');
      st.id = 'ksvl-nudge-style';
      st.textContent = ''
        + '@keyframes ksvlNudgePulse { 0%, 100% { transform: translateX(-50%) scale(1); } 50% { transform: translateX(-50%) scale(1.05); } }'
        + '#' + NUDGE_ID + ' { position: fixed; left: 50%; bottom: 86px; transform: translateX(-50%); z-index: 9500;'
        + '  display: inline-flex; align-items: center; gap: 8px; padding: 11px 22px; border-radius: 999px;'
        + '  background: #b7e42b; color: #202020; font: 800 12px/1 "Jost", sans-serif;'
        + '  letter-spacing: 0.12em; text-transform: uppercase; white-space: nowrap;'
        + '  box-shadow: 0 8px 24px rgba(26, 8, 24, 0.35); cursor: pointer;'
        + '  animation: ksvlNudgePulse 1.5s ease-in-out infinite; }'
        + '@media (prefers-reduced-motion: reduce) { #' + NUDGE_ID + ' { animation: none; } }';
      document.head.appendChild(st);
    }
    var chip = document.createElement('div');
    chip.id = NUDGE_ID;
    chip.textContent = text || '▶ Tap anywhere — the radio continues';
    document.body.appendChild(chip);
  }
  function hideResumeNudge() {
    var chip = document.getElementById(NUDGE_ID);
    if (chip) chip.remove();
  }
  function armGestureResume(text) {
    showResumeNudge(text);
    if (gestureArmed) return;
    gestureArmed = true;
    var resume = function() {
      document.removeEventListener('pointerdown', resume, true);
      document.removeEventListener('keydown', resume, true);
      gestureArmed = false;
      hideResumeNudge();
      // Muted-rolling case: the track is already playing — just unmute.
      if (state.audio && state.mutedAutoplay && !state.paused) {
        state.mutedAutoplay = false;
        try { state.audio.muted = false; } catch(e) {}
        updateNowPlaying();
        return;
      }
      if (!state.audio || !state.paused) return;
      state.audio.play().then(function() {
        state.paused = false;
        updateNowPlaying();
      }).catch(function() {});
    };
    document.addEventListener('pointerdown', resume, true);
    document.addEventListener('keydown', resume, true);
  }

  // Pop-out player — the truly continuous option. A little Y2K player
  // window keeps the audio alive no matter where the main window goes.
  // The popup heartbeats into localStorage so regular pages know not to
  // fight it for the audio.
  var IS_POPUP = /\/ksvl-popup(?:\.html)?\/?$/.test(window.location.pathname);
  var OWNER_KEY = 'laidies_ksvl_owner_v2';
  var COMMAND_KEY = 'laidies_ksvl_command_v2';
  var NAV_KEY = 'laidies_ksvl_navigation_v2';
  var TRANSFER_KEY = 'laidies_ksvl_transfer_v2';
  var ownerId = typeof crypto.randomUUID === 'function' ? crypto.randomUUID() :
    Date.now().toString(36) + '-' + Math.random().toString(36).slice(2);
  var ownsAudio = false, releaseAudioLock = null, acquiringAudio = null;
  var remoteOwner = null, pageLeaving = false;

  function readOwner() {
    try {
      var item = JSON.parse(localStorage.getItem(OWNER_KEY));
      if (!item || typeof item.id !== 'string' || item.id.length > 80 ||
          !Number.isFinite(item.at) || item.at > Date.now() || Date.now() - item.at > 15000 ||
          typeof item.popup !== 'boolean' || !Number.isFinite(item.duration) ||
          item.duration < 0 || item.duration > 86400 ||
          !validateSavedState(item.playback) ||
          (item.upNextTitle !== undefined && (typeof item.upNextTitle !== 'string' || item.upNextTitle.length > 500))) return null;
      return item;
    } catch (e) { return null; }
  }

  function releaseOwnership() {
    ownsAudio = false;
    if (releaseAudioLock) { releaseAudioLock(); releaseAudioLock = null; }
    try {
      var item = JSON.parse(localStorage.getItem(OWNER_KEY));
      if (item && item.id === ownerId) localStorage.removeItem(OWNER_KEY);
    } catch (e) {}
  }

  function acquireOwnership() {
    if (ownsAudio) return Promise.resolve(true);
    if (acquiringAudio) return acquiringAudio;
    // The browser lock is the authority; the heartbeat supplies display state,
    // never permission to steal a background tab's audio.
    if (navigator.locks && navigator.locks.request) {
      acquiringAudio = new Promise(function(resolve) {
        navigator.locks.request('laidies-ksvl-audio-v2', {ifAvailable: true}, function(lock) {
          if (!lock || pageLeaving) { resolve(false); return; }
          ownsAudio = true;
          remoteOwner = null;
          resolve(true);
          return new Promise(function(release) { releaseAudioLock = release; });
        }).catch(function() { resolve(false); });
      }).then(function(value) { acquiringAudio = null; return value; });
      return acquiringAudio;
    }
    // Without Web Locks, only the visible page may own sound. Cross-window
    // continuity is unavailable rather than permitted to create competing audio.
    if (document.visibilityState === 'hidden') return Promise.resolve(false);
    ownsAudio = true;
    remoteOwner = null;
    return Promise.resolve(true);
  }

  function followOwner() {
    if (ownsAudio || pageLeaving) return false;
    var item = readOwner();
    if (!item || item.id === ownerId) {
      if (remoteOwner) {
        remoteOwner = null;
        state.queue = []; state.mixId = null;
        if (np) np.classList.remove('is-visible');
        hydrateFromStorage(false);
      }
      return false;
    }
    remoteOwner = item;
    restoreQueue(item.playback);
    state.paused = item.playback.paused;
    updateNowPlaying();
    announce((item.popup ? 'Pop-out player' : 'Another town tab') +
      (state.paused ? ' is paused. Resume here or in that window.' : ' is playing. These controls operate that player.'), 'status');
    syncSoundControls();
    return true;
  }

  function sendRemote(action, value) {
    if (ownsAudio) return false;
    var item = readOwner();
    if (!item || item.id === ownerId) return false;
    try {
      localStorage.setItem(COMMAND_KEY, JSON.stringify({target: item.id,
        at: Date.now(), nonce: Math.random().toString(36), action: action, value: value}));
      followOwner();
    } catch (e) { announce('The other player could not be reached. Use its own controls.', 'error'); }
    return true;
  }

  window.addEventListener('storage', function(event) {
    if (event.key === OWNER_KEY) { followOwner(); return; }
    if (event.key !== COMMAND_KEY || !ownsAudio) return;
    try {
      var command = JSON.parse(event.newValue);
      if (!command || command.target !== ownerId || !Number.isFinite(command.at) ||
          command.at > Date.now() || Date.now() - command.at > 5000) return;
      var value = command.value;
      switch (command.action) {
        case 'toggle': togglePlay(); break;
        case 'pause': if (state.audio && !state.paused) togglePlay(); break;
        case 'next': nextTrack(); break;
        case 'previous': prevTrack(); break;
        case 'stop': stopPlayer(); break;
        case 'mute': toggleMute(); break;
        case 'shuffle': toggleShuffle(); break;
        case 'repeat': cycleRepeat(); break;
        case 'retry': retryCurrent(); break;
        case 'live': startLive(); break;
        case 'track': if (typeof value === 'string') window.KSVL_playTrackById(value); break;
        case 'mix': if (value && typeof value.id === 'string' && Number.isInteger(value.index)) startMix(value.id, value.index); break;
        case 'album': if (value && typeof value.id === 'string' && Number.isInteger(value.index)) startAlbum(value.id, value.index); break;
        case 'volume': if (Number.isFinite(value) && value >= 0 && value <= 1) { npVolume.value = String(value); setVolumeFromControl(); } break;
        case 'seek': if (Number.isFinite(value) && value >= 0 && value <= 1) window.KSVL_seekToRatio(value); break;
      }
      saveState();
    } catch (e) {}
  });
  setInterval(function() { if (ownsAudio) saveState(); else followOwner(); }, 1000);
  document.addEventListener('play', function(event) {
    var media = event.target;
    if (!media || media === state.audio || media.muted || !/^(AUDIO|VIDEO)$/.test(media.tagName)) return;
    if (!sendRemote('pause') && state.audio && !state.paused) togglePlay();
  }, true);

  function popOutPlayer() {
    if (!(navigator.locks && navigator.locks.request)) {
      announce('This browser cannot keep a separate player safely connected. Continue listening here.', 'status');
      return;
    }
    if (remoteOwner) {
      announce('The music is already controlled by another window. These controls remain connected to it.', 'status');
      return;
    }
    if (!saveState()) return;
    var transfer = ownerId + '-' + Date.now();
    try { localStorage.setItem(TRANSFER_KEY, JSON.stringify({token: transfer, at: Date.now(), playing: !state.paused})); }
    catch (e) { announce('Pop-out needs browser storage. Your music is still playing here.', 'status'); return; }
    var popup = window.open('/ksvl-popup.html?transfer=' + encodeURIComponent(transfer), 'ksvlPopup', 'width=440,height=420,resizable=yes');
    if (!popup) {
      try { localStorage.removeItem(TRANSFER_KEY); } catch (e) {}
      announce('The browser blocked the pop-out. Your music is still here.', 'status');
      return;
    }
    ++playToken;
    stopExistingAudio();
    releaseOwnership();
    state.queue = []; state.mixId = null; state.paused = true;
    announce('Opening the pop-out player. Its controls will also appear here.', 'status');
  }

  var playToken = 0;
  function playIndex(i) {
    state.restoring = false;
    state.finished = false;
    state.nextChoice = null;
    state.index = ((i % state.queue.length) + state.queue.length) % state.queue.length;
    state.currentPart = 0;
    if (window.plausible) { try { window.plausible('KSVL play', { props: { track: (state.queue[state.index] || {}).title || '' } }); } catch (e) {} }
    playCurrentPart();
  }

  // Play the current part (or the whole track if no parts). Handles intro→spot flow.
  function playCurrentPart() {
    var myToken = ++playToken;
    acquireOwnership().then(function(acquired) {
      if (myToken !== playToken || pageLeaving) return;
      if (!acquired) {
        if (!followOwner()) announce('Another town window owns the music. Return to that player or choose Resume after it closes.', 'status');
        return;
      }
      playOwnedPart(myToken);
    });
  }

  function playOwnedPart(myToken) {
    stopExistingAudio();
    var track = state.queue[state.index];
    var part = currentPart();
    var src = part ? part.src : track.src;
    var displayTitle = (track.parts && part && part.title) ? part.title : track.title;
    if (!isAdmittedSource(src)) {
      state.paused = true;
      state.lastFailure = {kind: 'admission', src: src};
      announce('This track cannot start right now. Please choose another one or try again later.', 'error');
      return;
    }
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
    // Mid silent-rolling (autoplay was blocked): keep new parts/tracks muted
    // too, so the broadcast continues seamlessly until the first tap.
    if (state.mutedAutoplay) { try { audio.muted = true; } catch(e) {} }
    audio.volume = state.volume;
    audio.muted = state.muted;
    console.log('[KSVL] Play', state.index + 1, ':', displayTitle, '·', src);
    audio.addEventListener('ended', function() {
      if (myToken !== playToken) { console.log('[KSVL] Stale ended ignored for', displayTitle); return; }
      console.log('[KSVL] Ended', displayTitle);
      // If this track has more parts, advance to next part; else advance to next track.
      if (track.parts && state.currentPart < track.parts.length - 1) {
        state.currentPart++;
        playCurrentPart();
      } else {
        announce(displayTitle + ' ended.', 'status', true);
        advanceOnEnded();
      }
    });
    audio.addEventListener('error', function(e) {
      if (myToken !== playToken) return;
      console.warn('[KSVL] Audio error on', src, e);
      state.paused = true;
      state.lastFailure = {kind: 'media', src: src};
      announce('This track could not load. Try it again when you are ready.', 'error');
    });
    audio.addEventListener('loadedmetadata', function() {
      if (!Number.isFinite(audio.duration) || audio.duration <= 0) {
        state.paused = true;
        state.lastFailure = {kind: 'metadata', src: src};
        try { audio.pause(); } catch (error) {}
        announce('This track has invalid duration metadata and cannot be offered.', 'error');
        return;
      }
      syncSoundControls();
    });
    audio.addEventListener('timeupdate', syncSoundControls);
    audio.addEventListener('volumechange', syncSoundControls);
    audio.addEventListener('waiting', function() {
      if (myToken === playToken) announce('KSVL is waiting for enough audio data to continue…', 'loading');
    });
    audio.addEventListener('stalled', function() {
      if (myToken === playToken) announce('The network stopped delivering this track. Playback has not advanced.', 'error');
    });
    audio.addEventListener('playing', function() {
      if (myToken !== playToken) return;
      state.paused = false;
      state.lastFailure = null;
      announce('Now listening to ' + displayTitle + '.', 'playing');
      updateNowPlaying();
    });
    audio.addEventListener('pause', function() {
      if (myToken !== playToken || audio.ended) return;
      state.paused = true;
      announce(displayTitle + ' is paused.', 'status', true);
      updateNowPlaying();
    });
    state.audio = audio;
    if (state.restoring) {
      var restoration = state.restoring;
      state.restoring = false;
      var seekRestored = function() {
        if (myToken !== playToken || state.audio !== audio) return;
        try { if (Number.isFinite(audio.duration)) audio.currentTime = Math.min(restoration.time, Math.max(0, audio.duration - 0.5)); } catch (e) {}
        syncSoundControls();
        saveState();
      };
      if (audio.readyState >= 1) seekRestored();
      else audio.addEventListener('loadedmetadata', seekRestored, {once: true});
      if (!restoration.play) {
        state.paused = true;
        announce(state.finished ? 'Finished. Press Play again to restart this playlist.' : 'Pick up where you left off. Press Resume to keep listening.', 'status', true);
        updateNowPlaying();
        syncSoundControls();
        return;
      }
    }
    state.paused = true;
    announce('Starting ' + displayTitle + '…', 'loading');
    audio.play().then(function() {
      if (myToken !== playToken) return;
      state.paused = false;
      updateNowPlaying();
    }).catch(function(err) {
      if (myToken !== playToken) return;
      console.warn('[KSVL] play() rejected for', src, err);
      if (err && err.name === 'NotAllowedError') {
        state.paused = true;
        state.lastFailure = {kind: 'autoplay', src: src};
        announce('The browser blocked playback. Use Retry or Listen to start this track with an explicit action.', 'error');
      } else {
        state.paused = true;
        state.lastFailure = {kind: 'play', src: src};
        announce('This track could not start. Nothing was counted or skipped.', 'error');
      }
    });
    updateNowPlaying();
    preloadNextInFlow();
  }

  // Preload whatever plays next in the flow: next part of current track, or first part of next track.
  function preloadNextInFlow() {
    var upcoming = nextInFlow();
    var nextSrc = upcoming && upcoming.item.src;
    if (nextSrc && nextSrc === state.preloadedSrc) return;
    if (!nextSrc) { state.preloadedAudio = null; state.preloadedSrc = null; return; }
    var next = new Audio(nextSrc);
    next.preload = 'auto';
    state.preloadedAudio = next;
    state.preloadedSrc = nextSrc;
  }

  function advanceOnEnded() {
    if (state.signingOff) { realStopPlayer(); return; }
    if (state.mixId === 'single') { finishPlaylist(); return; }
    var next = nextInFlow();
    if (!next) { finishPlaylist(); return; }
    playIndex(next.index);
  }

  function finishPlaylist() {
    state.finished = true;
    state.paused = true;
    state.nextChoice = null;
    state.preloadedAudio = null; state.preloadedSrc = null;
    if (state.audio) state.audio.pause();
    announce('Finished. Press Play again to restart this playlist.', 'status', true);
    updateNowPlaying();
    syncSoundControls();
    saveState();
  }

  function catalogueStartingWith(trackId) {
    var index = TRACKS.findIndex(function(track) { return track.id === trackId; });
    return index < 0 ? [] : TRACKS.slice(index).concat(TRACKS.slice(0, index));
  }

  function toggleShuffle() {
    if (sendRemote('shuffle')) return;
    state.shuffle = !state.shuffle;
    state.nextChoice = null;
    if (npShuffleBtn) {
      npShuffleBtn.classList.toggle('is-active', state.shuffle);
      npShuffleBtn.setAttribute('aria-label', state.shuffle ? 'Shuffle · on' : 'Shuffle · off');
    }
    updateUpNext();
    preloadNextInFlow();
    saveState();
  }

  function cycleRepeat() {
    if (sendRemote('repeat')) return;
    state.repeatMode = state.repeatMode === 'off' ? 'all' : (state.repeatMode === 'all' ? 'one' : 'off');
    state.nextChoice = null;
    if (npRepeatBtn) {
      npRepeatBtn.classList.toggle('is-active', state.repeatMode !== 'off');
      setBtnIcon(npRepeatBtn, state.repeatMode === 'one' ? '🔂' : '🔁');
      npRepeatBtn.setAttribute('aria-label', state.repeatMode === 'off' ? 'Repeat off' : (state.repeatMode === 'one' ? 'Repeat one' : 'Repeat all'));
      npRepeatBtn.setAttribute('title', 'Repeat: ' + state.repeatMode);
    }
    updateUpNext();
    preloadNextInFlow();
    saveState();
  }

  function startMix(mixId, startTrackIndex) {
    if (sendRemote('mix', {id: mixId, index: startTrackIndex || 0})) return;
    var mix = MIXES.filter(function(m) { return m.id === mixId; })[0];
    if (!mix) return;
    var queue = tracksForMix(mixId);
    if (!queue.length) return;
    state.mixId = mixId;
    state.queue = queue.map(wrapWithIntro);
    var startAt = 0;
    if (typeof startTrackIndex === 'number' && startTrackIndex >= 0 && startTrackIndex < queue.length) {
      startAt = startTrackIndex;
    }
    playIndex(startAt);
  }

  // Play one band's album — filters TRACKS by artist, wraps each with intro, opens with station ID.
  function tracksForArtist(artist) {
    return TRACKS.filter(function(t) { return t.artist === artist; });
  }
  function startAlbum(artist, startTrackIndex) {
    if (sendRemote('album', {id: artist, index: startTrackIndex || 0})) return;
    var queue = tracksForArtist(artist);
    if (!queue.length) return;
    state.mixId = 'album:' + artist;
    state.queue = queue.map(wrapWithIntro);
    var startAt = 0;
    if (typeof startTrackIndex === 'number' && startTrackIndex >= 0 && startTrackIndex < queue.length) {
      startAt = startTrackIndex;
    }
    playIndex(startAt);
  }
  window.KSVL_startAlbum = startAlbum;
  window.KSVL_tracksForArtist = tracksForArtist;

  // Page song choices start the complete admitted catalogue at the chosen song.
  // Keep the entry point name for existing page callers; playback defaults to one pass.
  function startSingle(track) {
    if (!track || !track.src || !isAdmittedSource(track.src)) {
      announce('That track cannot start right now. Please choose another one.', 'held');
      return false;
    }
    // External theme callers pass a URL; resolve it back to the canonical ID.
    track = TRACKS.filter(function(item) { return item.src === track.src; })[0];
    if (!track) return false;
    if (sendRemote('track', track.id)) return true;
    state.mixId = 'catalogue';
    state.startTrackId = track.id;
    state.queue = catalogueStartingWith(track.id);
    state.index = 0;
    state.currentPart = 0;
    state.shuffle = false;
    state.repeatMode = 'off';
    if (npShuffleBtn) npShuffleBtn.classList.remove('is-active');
    if (npRepeatBtn) { npRepeatBtn.classList.remove('is-active'); setBtnIcon(npRepeatBtn, '🔁'); }
    playIndex(0);
    return true;
  }
  window.KSVL_playTrack = function(src, title, artist) {
    return startSingle({ src: src, title: title, artist: artist });
  };
  window.KSVL_playTrackById = function(trackId) {
    var track = TRACKS.filter(function(candidate) { return candidate.id === trackId; })[0];
    if (!track) {
      announce('That track cannot start right now. Please choose another one.', 'held');
      return false;
    }
    return startSingle(track);
  };
  window.KSVL_getAdmittedTracks = function() {
    return TRACKS.map(function(track) {
      return { id: track.id, title: track.title, artist: track.artist };
    });
  };
  window.KSVL_togglePlayback = function() {
    if (!state.audio && !remoteOwner) return false;
    togglePlay();
    return true;
  };
  window.KSVL_cycleRepeat = function() {
    cycleRepeat();
    return state.repeatMode;
  };
  window.KSVL_seekToRatio = function(ratio) {
    if (!Number.isFinite(Number(ratio))) return false;
    if (sendRemote('seek', Math.max(0, Math.min(1, Number(ratio))))) return true;
    if (!state.audio || !Number.isFinite(state.audio.duration) || state.audio.duration <= 0) {
      announce('This track does not provide usable seek metadata.', 'error');
      return false;
    }
    try {
      state.audio.currentTime = Math.max(0, Math.min(1, Number(ratio))) * state.audio.duration;
      announce('Moved within ' + ((currentPart() || {}).title || 'the current track') + '.', 'status', true);
      syncSoundControls();
      return true;
    } catch (error) {
      announce('The browser could not seek in this track. Playback position was not changed.', 'error');
      return false;
    }
  };
  window.KSVL_getPublicState = function() {
    var track = state.queue[state.index] || null;
    var part = currentPart();
    return track ? {
      trackId: track.id || '',
      title: track.title || '',
      artist: track.artist || '',
      paused: !!state.paused,
      repeatMode: state.repeatMode,
      currentTime: remoteOwner ? remoteOwner.playback.currentTime : state.audio && Number.isFinite(state.audio.currentTime) ? state.audio.currentTime : 0,
      duration: remoteOwner ? remoteOwner.duration : state.audio && Number.isFinite(state.audio.duration) ? state.audio.duration : 0,
      status: npStatus ? npStatus.textContent : '',
      partTitle: part && part.title ? part.title : ''
    } : null;
  };

  function nextTrack() { if (!sendRemote('next') && state.queue.length) playIndex(state.index + 1); }

  function prevTrack() { if (!sendRemote('previous') && state.queue.length) playIndex(state.index - 1); }

  function togglePlay() {
    if (sendRemote('toggle')) return;
    if (state.finished && state.queue.length) { playIndex(0); return; }
    if (!state.audio) {
      if (state.queue.length) { state.restoring = false; playCurrentPart(); }
      return;
    }
    if (state.paused) {
      announce('Starting ' + ((currentPart() || {}).title || 'this track') + '…', 'loading');
      state.audio.play().then(function() {
        state.paused = false;
        updateNowPlaying();
      }).catch(function(error) {
        state.paused = true;
        state.lastFailure = {kind: 'play', src: currentSrc()};
        announce(error && error.name === 'NotAllowedError' ?
          'The browser blocked playback. Try again from this Listen control.' :
          'This track could not start. Nothing was counted or skipped.', 'error');
      });
    } else {
      state.audio.pause();
      state.paused = true;
      announce(((currentPart() || {}).title || 'This track') + ' is paused.', 'status', true);
      updateNowPlaying();
    }
  }

  // Immediate hard-stop. Used after signoff finishes or if user double-taps Stop.
  function realStopPlayer() {
    ++playToken;
    stopExistingAudio();
    state.mixId = null; state.queue = []; state.index = 0; state.currentPart = 0; state.paused = false;
    state.signingOff = false;
    state.finished = false; state.startTrackId = null;
    state.preloadedAudio = null; state.preloadedSrc = null;
    if (np) np.classList.remove('is-visible');
    document.querySelectorAll('.ksvl-cd').forEach(function(cd) { cd.classList.remove('is-playing'); });
    try { localStorage.removeItem('laidies_ksvl_player_state_v1'); } catch(e) {}
    releaseOwnership();
  }

  // Programme objects remain held; Stop therefore ends the admitted catalogue directly.
  function stopPlayer() {
    if (sendRemote('stop')) return;
    realStopPlayer();
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
      jewel.appendChild(el('img', {class: 'ksvl-cd-disc', src: '/assets/ksvl/player-cd-silver-v1.png', alt: '', loading: 'lazy'}));
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
      'aria-label': 'Listen to full ' + mix.title + ' mix — ' + trackCount + ' tracks',
      title: 'Listen to full mix',
      text: '▶'
    });
    if (!trackCount) {
      playBtn.disabled = true;
      playBtn.setAttribute('aria-label', mix.title + ' has no playable local tracks');
      playBtn.title = 'No playable local tracks in this mix';
    }
    playBtn.addEventListener('click', function(e) { e.stopPropagation(); startMix(mix.id); });
    var front = el('div', {class: 'ksvl-cd-face ksvl-cd-face--front'}, [jewel, playBtn]);

    // Back face — full tracklist + flip-back button
    var backList = el('ul', {class: 'ksvl-cd-tracklist-back'});
    tracks.forEach(function(t, i) {
      var trackBtn = el('button', {
        class: 'ksvl-cd-back-track',
        type: 'button',
        'aria-label': 'Listen to ' + (t.title || 'Untitled')
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
    function flipCD(flipped) {
      flipContainer.classList.toggle('is-flipped', flipped);
      flipContainer.setAttribute('aria-expanded', String(flipped));
      front.inert = flipped; back.inert = !flipped;
      front.setAttribute('aria-hidden', String(flipped));
      back.setAttribute('aria-hidden', String(!flipped));
    }
    flipCD(false);
    flipContainer.addEventListener('click', function(e) {
      if (e.target.closest('button')) return;
      flipCD(!flipContainer.classList.contains('is-flipped'));
    });
    flipContainer.addEventListener('keydown', function(e) {
      if (e.target === flipContainer && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); flipCD(!flipContainer.classList.contains('is-flipped')); }
    });
    flipBackBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      flipCD(false);
    });

    var caption = el('div', {class: 'ksvl-cd-caption'}, [
      el('p', {class: 'ksvl-cd-caption-title', text: mix.title}),
      el('p', {class: 'ksvl-cd-caption-sub', text: mix.sub})
    ]);

    return el('div', {class: 'ksvl-cd-item'}, [flipContainer, caption]);
  }

  function mount() {
    injectStyle();
    checkContinuityStorage();
    var mountEl = document.getElementById('ksvl-mix-cds');
    if (mountEl) {
      var rack = el('div', {class: 'ksvl-mix-rack'}, [
        el('div', {class: 'ksvl-mix-eyebrow', text: '★ KSVL · Mix CDs'}),
        el('h2', {class: 'ksvl-mix-title', text: 'Pick a mix.'}),
        el('p', {class: 'ksvl-mix-lede', text: TRACKS.length ?
          'A rack of LAiDIES original songs. Choose Listen when you are ready; listening position stays on this device.' :
          'KSVL cannot start a track right now. Please try again later.'}),
        el('div', {class: 'ksvl-mix-grid'})
      ]);
      var grid = rack.querySelector('.ksvl-mix-grid');
      MIXES.forEach(function(mix) { grid.appendChild(buildCD(mix)); });
      mountEl.innerHTML = '';
      mountEl.appendChild(rack);
    }
    // Coordinate with this page's standalone ♪ buttons (inline scripts have
    // all run by DOMContentLoaded, so the original is defined by now).
    wrapThemePlayer();
    // Always try to hydrate saved playback — the persistent bar follows the visitor
    // across every page, so any page can pick up where they left off.
    // Unless the pop-out player window is live: it owns the audio.
    if (!followOwner()) hydrateFromStorage(consumeContinuation());
    if (!TRACKS.length && (mountEl || IS_POPUP)) {
      announce(catalogFailure ||
        'KSVL cannot start a track right now. Please try again later.', 'held');
    }
  }

  // ---- Persistence: save on unload, hydrate on load ----
  var LS_KEY = 'laidies_ksvl_player_state_v1';
  var STATE_TTL_MS = 1000 * 60 * 60 * 6; // 6 hours — old sessions won't auto-resume

  function trackIdFor(item) {
    // Only catalog tracks have stable IDs. Jingles, wrapped intros, commercials return null.
    return (item && item.id) ? item.id : null;
  }

  function buildSavedState() {
      if (!state.mixId || !state.queue.length || !activeRegistryId) return null;
      var ctx = null, extra = {};
      if (state.mixId.indexOf('album:') === 0) { ctx = 'album'; extra.artist = state.mixId.slice(6); }
      else if (MIXES.some(function(m){ return m.id === state.mixId; })) { ctx = 'mix'; extra.mixId = state.mixId; }
      else if (state.mixId === 'catalogue') { ctx = 'catalogue'; extra.startTrackId = state.startTrackId; }
      else if (state.mixId === 'single' || state.mixId === 'live') { ctx = state.mixId; }
      else { return null; }
      var track = state.queue[state.index];
      var currentTime = 0;
      try { if (state.audio && !isNaN(state.audio.currentTime)) currentTime = state.audio.currentTime; } catch(e) {}
      var payload = {
        v: 1,
        registryId: activeRegistryId,
        ctx: ctx,
        trackId: trackIdFor(track),
        currentTime: currentTime,
        finished: !!state.finished,
        paused: !!state.paused,
        shuffle: !!state.shuffle,
        repeatMode: state.repeatMode || 'all',
        volume: state.volume,
        muted: state.muted,
        savedAt: (new Date()).valueOf()
      };
      Object.keys(extra).forEach(function(k){ payload[k] = extra[k]; });
      return payload;
  }

  function saveState() {
    if (!ownsAudio || remoteOwner) return false;
    try {
      var payload = buildSavedState();
      if (!payload) return false;
      localStorage.setItem(LS_KEY, JSON.stringify(payload));
      localStorage.setItem(OWNER_KEY, JSON.stringify({id: ownerId, at: Date.now(), popup: IS_POPUP,
        duration: state.audio && Number.isFinite(state.audio.duration) ? state.audio.duration : 0,
        playback: payload, upNextTitle: nextTitle()}));
      return true;
    } catch(e) { reportStorageLimit(); return false; }
  }

  function readSavedState() {
    function discard() {
      try { localStorage.removeItem(LS_KEY); } catch (error) {}
      return null;
    }
    try {
      var raw = localStorage.getItem(LS_KEY);
      if (!raw) return null;
      var s = validateSavedState(JSON.parse(raw));
      return s || discard();
    } catch(e) { return discard(); }
  }

  function validateSavedState(s) {
      var baseKeys = ['v','registryId','ctx','trackId','currentTime','paused','shuffle','repeatMode','volume','muted','savedAt'];
      if (s && Object.prototype.hasOwnProperty.call(s, 'finished')) baseKeys.push('finished');
      var expectedKeys = s && s.ctx === 'catalogue' ? baseKeys.concat('startTrackId') : s && s.ctx === 'mix' ? baseKeys.concat('mixId') :
        (s && s.ctx === 'album' ? baseKeys.concat('artist') :
          (s && ['live','single'].includes(s.ctx) ? baseKeys : []));
      var now = Date.now();
      if (!s || !expectedKeys.length ||
          Object.keys(s).sort().join('|') !== expectedKeys.sort().join('|') ||
          s.v !== 1 || s.registryId !== activeRegistryId ||
          !['mix','album','live','single','catalogue'].includes(s.ctx) ||
          typeof s.trackId !== 'string' || !s.trackId ||
          !Number.isFinite(s.currentTime) || s.currentTime < 0 || s.currentTime > 86400 ||
          (s.finished !== undefined && (typeof s.finished !== 'boolean' || (s.finished && !s.paused))) ||
          (s.ctx === 'catalogue' && (typeof s.startTrackId !== 'string' || !TRACKS.some(function(t) { return t.id === s.startTrackId; }))) ||
          typeof s.paused !== 'boolean' || typeof s.shuffle !== 'boolean' ||
          !['off','all','one'].includes(s.repeatMode) ||
          !Number.isFinite(s.volume) || s.volume < 0 || s.volume > 1 ||
          typeof s.muted !== 'boolean' ||
          !Number.isFinite(s.savedAt) || s.savedAt > now ||
          s.savedAt < now - STATE_TTL_MS ||
          (s.ctx === 'mix' && !MIXES.some(function(m) { return m.id === s.mixId; })) ||
          (s.ctx === 'album' && (typeof s.artist !== 'string' || !s.artist.trim()))) {
        return null;
      }
      if (!queueForSaved(s).some(function(track) { return track.id === s.trackId; })) return null;
      return s;
  }

  function queueForSaved(s) {
    if (s.ctx === 'catalogue') return catalogueStartingWith(s.startTrackId);
    if (s.ctx === 'mix') return tracksForMix(s.mixId);
    if (s.ctx === 'album') return tracksForArtist(s.artist);
    if (s.ctx === 'live') return TRACKS.slice();
    if (s.ctx === 'single') return TRACKS.filter(function(track) { return track.id === s.trackId; });
    return [];
  }

  function restoreQueue(s) {
    var queue = queueForSaved(s);
    // Find the saved track in the queue.
    var trackIdx = -1;
    if (s.trackId) {
      for (var i = 0; i < queue.length; i++) { if (queue[i].id === s.trackId) { trackIdx = i; break; } }
    }
    if (trackIdx < 0) {
      try { localStorage.removeItem(LS_KEY); } catch (error) {}
      return;
    }
    // Rehydrate state — station opener is added at queue[0], real tracks start at 1.
    state.mixId = (s.ctx === 'album') ? ('album:' + s.artist) : (s.ctx === 'mix' ? s.mixId : s.ctx);
    state.queue = s.ctx === 'catalogue' ? queue : queue.map(wrapWithIntro);
    state.startTrackId = s.ctx === 'catalogue' ? s.startTrackId : null;
    state.finished = !!s.finished;
    state.index = trackIdx;
    state.currentPart = 0;
    state.shuffle = !!s.shuffle;
    state.repeatMode = s.repeatMode || 'all';
    state.volume = Number.isFinite(+s.volume) ? Math.max(0, Math.min(1, +s.volume)) : 0.8;
    state.muted = !!s.muted;
    if (npShuffleBtn) { npShuffleBtn.classList.toggle('is-active', state.shuffle); }
    if (npRepeatBtn) {
      npRepeatBtn.classList.toggle('is-active', state.repeatMode !== 'off');
      setBtnIcon(npRepeatBtn, state.repeatMode === 'one' ? '🔂' : '🔁');
    }
  }

  function hydrateFromStorage(continuePlaying) {
    var s = readSavedState();
    if (!s) return;
    restoreQueue(s);
    state.restoring = {time: s.currentTime, play: !!continuePlaying && !s.paused && !s.finished};
    playCurrentPart();
  }

  function normalPath(path) { return path.replace(/\.html$/, '').replace(/\/$/, '') || '/'; }
  function consumeContinuation() {
    try {
      if (IS_POPUP) {
        var transfer = JSON.parse(localStorage.getItem(TRANSFER_KEY));
        var token = new URLSearchParams(location.search).get('transfer');
        if (token && transfer && transfer.token === token && Date.now() - transfer.at >= 0 && Date.now() - transfer.at < 15000) {
          localStorage.removeItem(TRANSFER_KEY);
          return transfer.playing === true;
        }
        return false;
      }
      var navigation = JSON.parse(sessionStorage.getItem(NAV_KEY));
      sessionStorage.removeItem(NAV_KEY);
      return !!(navigation && navigation.playing === true && Date.now() - navigation.at >= 0 &&
        Date.now() - navigation.at < 15000 && navigation.to === normalPath(location.pathname));
    } catch (e) { return false; }
  }

  function bindPersistenceHooks() {
    // Save aggressively — the exact unload event varies by browser + platform.
    window.addEventListener('beforeunload', saveState);
    document.addEventListener('click', function(event) {
      var link = event.target.closest && event.target.closest('a[href]');
      if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
          link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
      var target = new URL(link.href, location.href);
      if (target.origin !== location.origin || (target.pathname === location.pathname && target.search === location.search)) return;
      try { sessionStorage.setItem(NAV_KEY, JSON.stringify({at: Date.now(), to: normalPath(target.pathname), playing: ownsAudio && !!state.audio && !state.paused})); } catch (e) { reportStorageLimit(); }
      saveState();
    });
    window.addEventListener('pagehide', function() {
      saveState(); pageLeaving = true; ++playToken;
      stopExistingAudio(); releaseOwnership();
    });
    window.addEventListener('pageshow', function(event) {
      if (!event.persisted) return;
      pageLeaving = false;
      if (!followOwner()) hydrateFromStorage(false);
    });
    document.addEventListener('visibilitychange', function() {
      if (document.visibilityState === 'hidden') {
        saveState();
        if (!(navigator.locks && navigator.locks.request)) {
          ++playToken; stopExistingAudio(); state.paused = true; releaseOwnership();
        }
      }
    });
    // Periodic save while playing, so a browser crash doesn't lose position.
    setInterval(function() { if (state.audio && !state.paused) saveState(); }, 5000);
  }

  bindPersistenceHooks();

  if (window.__KSVL_ENABLE_TEST_HOOKS) {
    window.KSVL_testSnapshot = function() {
      return state.audio ? {
        readyState: state.audio.readyState,
        duration: state.audio.duration,
        currentTime: state.audio.currentTime,
        paused: state.audio.paused,
        muted: state.audio.muted,
        volume: state.audio.volume,
        status: npStatus ? npStatus.textContent : ''
      } : null;
    };
  }

  // Ordinary KSVL links always navigate to the building. Only an explicit
  // non-link soundcheck control may ask the held player for station status.
  if (!IS_POPUP) {
    document.addEventListener('click', function (e) {
      var t = e.target;
      if (!t || !t.closest) return;
      var control = t.closest('button[data-ksvl-start-live]');
      if (control) startLive();
    }, true);
  }

  function boot() {
    loadRegistry().catch(function() {}).then(function() {
      var finishMount = function() {
        mount();
        resolveCatalogueReady({
          ready: catalogReady,
          failure: catalogFailure,
          tracks: window.KSVL_getAdmittedTracks()
        });
      };
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', finishMount, {once: true});
      } else {
        finishMount();
      }
    });
  }
  boot();
})();
