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
    { id: 'saint-bette',           title: 'Bette Midler · PATRON SAiNT of Range',             artist: 'The Ensembles',   src: MUSIC + 'saint-bette-midler.mp3',       intro: SAINT_INTROS + 'dj-sunnyv-intro-saint-bette-midler.mp3',     mixes: ['saints'] },
    { id: 'saint-buffy',           title: 'Buffy · PATRON SAiNT of SLAiYING',                 artist: 'The Overfits',    src: MUSIC + 'saint-buffy-summers.mp3',      intro: SAINT_INTROS + 'dj-sunnyv-intro-saint-buffy-summers.mp3',    mixes: ['saints'] },
    { id: 'saint-cher',            title: 'Cher · PATRON SAiNT of Early Adoption',            artist: 'The Overfits',    src: MUSIC + 'saint-cher-horowitz.mp3',      intro: SAINT_INTROS + 'dj-sunnyv-intro-saint-cher-horowitz.mp3',    mixes: ['saints'] },
    { id: 'saint-david',           title: 'David Rose · PATRON SAiNT of Specificity',         artist: 'Chain of Thought', src: MUSIC + 'saint-david-rose.mp3',         intro: SAINT_INTROS + 'dj-sunnyv-intro-saint-david-rose.mp3',       mixes: ['saints'] },
    { id: 'saint-deb',             title: 'Deb · PATRON SAiNT of Loop Me Out',                artist: 'Latent Space',    src: MUSIC + 'saint-deb.mp3',                intro: SAINT_INTROS + 'dj-sunnyv-intro-saint-deb.mp3',              mixes: ['saints'] },
    { id: 'saint-dolly',           title: 'Dolly Parton · PATRON SAiNT of Common Sense',      artist: "Grand Ol' Query", src: MUSIC + 'saint-dolly-parton.mp3',       intro: SAINT_INTROS + 'dj-sunnyv-intro-saint-dolly-parton.mp3',     mixes: ['saints'] },
    { id: 'saint-elle',            title: 'Elle Woods · PATRON SAiNT of Receipts',            artist: 'The Regressions', src: MUSIC + 'saint-elle-woods.mp3',         intro: SAINT_INTROS + 'dj-sunnyv-intro-saint-elle-woods.mp3',       mixes: ['saints'] },
    { id: 'saint-golden-girls',    title: 'The Golden Girls · PATRON SAiNT of Never Too Late', artist: 'The Diffusions',  src: MUSIC + 'saint-golden-girls.mp3',       intro: SAINT_INTROS + 'dj-sunnyv-intro-saint-golden-girls.mp3',    mixes: ['saints'] },
    { id: 'saint-miranda',         title: 'Miranda · PATRON SAiNT of Standards',              artist: 'Latent Space',    src: MUSIC + 'saint-miranda-priestly.mp3',   intro: SAINT_INTROS + 'dj-sunnyv-intro-saint-miranda-priestly.mp3', mixes: ['saints'] },
    { id: 'saint-regina',          title: 'Regina · PATRON SAiNT of Dangerous Confidence',    artist: 'The Embeddings',  src: MUSIC + 'saint-regina-george.mp3',      intro: SAINT_INTROS + 'dj-sunnyv-intro-saint-regina-george.mp3',    mixes: ['saints'] },
    { id: 'saint-samantha',        title: 'Samantha · PATRON SAiNT of Orientation',           artist: 'The Bots',        src: MUSIC + 'saint-samantha-jones.mp3',     intro: SAINT_INTROS + 'dj-sunnyv-intro-saint-samantha-jones.mp3',  mixes: ['saints'] },
    { id: 'saint-sister-mary-clarence', title: 'Sister Mary Clarence · PATRON SAiNT of Teaching', artist: 'The Embeddings', src: MUSIC + 'saint-sister-mary-clarence.mp3', intro: SAINT_INTROS + 'dj-sunnyv-intro-saint-sister-mary-clarence.mp3', mixes: ['saints'] },

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
    { id: 'ep-01',                 title: 'Ep 01 · On Wednesdays We Do AI',                       artist: 'The Regressions', src: MUSIC + 'dj-jaidy-week-01-on-wednesday-we-do-ai.mp3',           intro: SAINT_INTROS + 'dj-sunnyv-intro-episode-01.mp3', mixes: ['episodes'] },
    { id: 'ep-02',                 title: 'Ep 02 · Tell Me What You Want',                        artist: 'The Predicts',    src: MUSIC + 'dj-jaidy-week-02-tell-me-what-you-want.mp3',           intro: SAINT_INTROS + 'dj-sunnyv-intro-episode-02.mp3', mixes: ['episodes'] },
    { id: 'ep-03',                 title: "Ep 03 · Don't Be Chutney on the Stand",                artist: 'The Overfits',    src: MUSIC + 'dj-jaidy-week-03-dont-be-chutney-on-the-stand.mp3',    intro: SAINT_INTROS + 'dj-sunnyv-intro-episode-03.mp3', mixes: ['episodes'] },
    { id: 'ep-04',                 title: 'Ep 04 · It Was Women All Along',                       artist: 'The Priors',      src: MUSIC + 'dj-jaidy-week-04-it-was-women-all-along.mp3',          intro: SAINT_INTROS + 'dj-sunnyv-intro-episode-04.mp3', mixes: ['episodes'] },

    // B-side
    { id: 'every-slaiyer-watcher', title: 'Every SLAiYER Needs a Watcher',                       artist: 'The Embeddings',  src: MUSIC + 'dj-jaidy-every-slaiyer-needs-a-watcher.mp3',           mixes: ['bside'] },
    { id: 'impossible',            title: 'Impossible to Underestimate You',                    artist: 'The Overfits',   src: MUSIC + 'dj-jaidy-impossible-to-underestimate-you.mp3',        mixes: ['bside'] },
    { id: 'debs-tomorrow',         title: "Deb's Tomorrow Problem",                              artist: 'The Overfits',   src: MUSIC + 'debs-tomorrow-problem.mp3',                            mixes: ['bside'] }
  ];

  var TRACK_REGISTRY_URL = '/content/music/ksvl-track-registry.json';
  var REGISTRY_ID = 'ksvl-public-tracks-2026-07-25';
  var PUBLIC_RULE = 'A file is playable only when this registry marks it AVAILABLE and CLEARED_FOR_PUBLIC_STREAMING. HOLD is not a rights claim or a playback promise.';
  var catalogReady = false;
  var catalogFailure = '';
  var activeRegistryId = '';
  var registryBySrc = {};
  var runtimeTracks = TRACKS.slice();

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
      record.rightsStatus === 'CLEARED_FOR_PUBLIC_STREAMING' &&
      record.sourceStatus === 'EXACT_MASTER_VERIFIED' &&
      record.lyricStatus === 'AS_RECORDED_LYRICS_APPROVED' &&
      record.transcriptStatus === 'AS_RECORDED_TRANSCRIPT_APPROVED' &&
      record.captionStatus === 'AS_RECORDED_CAPTIONS_APPROVED' &&
      safeLocalLesson(record.sourceLesson) &&
      record.sourceLesson !== null;
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
        updatedAt > today || freshThrough < today || updatedAt > freshThrough) {
      throw new Error('The KSVL catalogue record is missing, stale or malformed.');
    }
    var allowed = ['id','title','artist','src','mixes','status','rightsStatus','sourceStatus','lyricStatus','transcriptStatus','captionStatus','sourceLesson','freshnessOwner','publicNote'];
    var rightsStates = ['CLEARED_FOR_PUBLIC_STREAMING','OWNER_REVIEW_REQUIRED'];
    var sourceStates = ['EXACT_MASTER_VERIFIED','EXACT_MASTER_REVIEW_REQUIRED','EXACT_MASTER_MISSING'];
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
          error.message : 'The KSVL catalogue could not be verified.';
        throw error;
      });
  }

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

  // ---- LIVE rotation assets ----
  var LIVE_MIX = { id: 'live', title: 'KSVL soundcheck', sub: 'Broadcast held pending admission', color: 'gold', labelStyle: 'sharpie' };

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
    // Jingles, transitions and spots are not admitted by the public track
    // registry yet. Do not turn song admission into live-broadcast admission.
    announce('KSVL listening is unavailable while its exact tracks, jingles, transitions and spots complete admission review.', 'held');
    return;
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
    /* Now Playing bar — the KSVL deck. Gold hairline top, spinning CD,
       big gold play button, and a tiny label under every control so no
       button is ever a mystery. */
    + '.ksvl-now-playing { position: fixed; left: 0; right: 0; bottom: 0; background: linear-gradient(160deg, #3a1838 0%, var(--plum, #4b2148) 55%, var(--rose, #9b3f5f) 100%); border-top: 2px solid var(--gold, #c9a227); color: var(--cream, #fffdfb); padding: 9px 20px 8px; display: none; align-items: center; gap: 16px; z-index: 9997; box-shadow: 0 -10px 30px rgba(26,8,24,0.4); font-family: "Jost", sans-serif; }'
    + '.ksvl-now-playing.is-visible { display: flex; }'
    + '.ksvl-np-cd-mini { flex-shrink: 0; width: 44px; height: 44px; border-radius: 50%; border: 2px solid rgba(201,162,39,0.7); background: radial-gradient(circle at 30% 30%, #f8eef2, #d8bfd0 45%, #a8779a 75%, #6b3a66); box-shadow: inset 0 0 4px rgba(0,0,0,0.2), 0 2px 8px rgba(0,0,0,0.3); animation: ksvl-spin 5s linear infinite; position: relative; }'
    + '.ksvl-np-cd-mini::after { content: ""; position: absolute; inset: 0; margin: auto; width: 30%; height: 30%; border-radius: 50%; background: var(--cream, #fffdfb); }'
    + '.ksvl-np-cd-mini.is-paused { animation-play-state: paused; }'
    + '.ksvl-np-info { flex: 1; min-width: 0; }'
    + '.ksvl-np-mix { display: flex; align-items: center; gap: 7px; font-size: 10px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: var(--gold, #c9a227); margin-bottom: 2px; }'
    + '.ksvl-now-playing.is-live .ksvl-np-mix::before { content: ""; flex-shrink: 0; width: 7px; height: 7px; border-radius: 50%; background: #ff4f4f; box-shadow: 0 0 6px rgba(255,79,79,0.9); animation: ksvl-np-onair 1.4s ease-in-out infinite; }'
    + '@keyframes ksvl-np-onair { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }'
    + '@media (prefers-reduced-motion: reduce) { .ksvl-now-playing.is-live .ksvl-np-mix::before { animation: none; } }'
    + '.ksvl-np-track { display: block; font-size: 15px; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }'
    + '.ksvl-np-position { font-size: 11px; opacity: 0.7; }'
    + '.ksvl-np-status { display: block; margin-top: 3px; min-height: 1.25em; font-size: 11px; line-height: 1.25; color: var(--cream, #fffdfb); }'
    + '.ksvl-np-status[data-kind="error"], .ksvl-np-status[data-kind="held"] { color: #ffe6a8; }'
    + '.ksvl-np-retry { margin-top: 6px; min-height: 44px; padding: 8px 14px; border: 1px solid var(--gold, #c9a227); border-radius: 999px; background: transparent; color: var(--cream, #fffdfb); font: 800 11px/1 "Jost", sans-serif; cursor: pointer; }'
    + '.ksvl-np-controls { display: flex; align-items: flex-start; flex-wrap: wrap; }'
    + '.ksvl-np-group { display: flex; align-items: flex-start; gap: 3px; }'
    + '.ksvl-np-group + .ksvl-np-group { margin-left: 12px; padding-left: 14px; border-left: 1px solid rgba(255,253,251,0.18); }'
    + '.ksvl-np-btn { display: inline-flex; flex-direction: column; align-items: center; gap: 3px; background: transparent; border: 0; color: var(--cream, #fffdfb); cursor: pointer; padding: 2px 3px; font-family: inherit; text-decoration: none; }'
    + '.ksvl-np-btn:focus { outline: none; }'
    + '.ksvl-np-ico { display: inline-flex; align-items: center; justify-content: center; width: 33px; height: 33px; border-radius: 50%; background: rgba(255,253,251,0.14); border: 1.5px solid rgba(255,253,251,0.35); font-size: 13px; line-height: 1; transition: background 0.15s ease, border-color 0.15s ease, transform 0.12s ease; text-shadow: 0 1px 2px rgba(0,0,0,0.3); }'
    + '.ksvl-np-btn:hover .ksvl-np-ico, .ksvl-np-btn:focus-visible .ksvl-np-ico { background: rgba(255,253,251,0.28); border-color: var(--gold, #c9a227); transform: translateY(-1px); }'
    + '.ksvl-np-volume, .ksvl-np-seek { min-height: 44px; accent-color: var(--gold, #c9a227); }'
    + '.ksvl-np-volume { width: 92px; } .ksvl-np-seek { width: min(190px, 24vw); }'
    + '.ksvl-np-lbl { font-size: 7.5px; font-weight: 800; letter-spacing: 0.13em; text-transform: uppercase; opacity: 0.72; white-space: nowrap; }'
    + '.ksvl-np-btn:hover .ksvl-np-lbl { opacity: 1; }'
    + '.ksvl-np-btn--play .ksvl-np-ico { width: 46px; height: 46px; background: var(--gold, #c9a227); border-color: var(--gold, #c9a227); color: #341446; font-size: 18px; text-shadow: none; box-shadow: 0 4px 12px rgba(0,0,0,0.32); }'
    + '.ksvl-np-btn--play:hover .ksvl-np-ico { background: #fffdfb; border-color: #fffdfb; }'
    + '.ksvl-np-btn--play .ksvl-np-lbl { color: var(--gold, #c9a227); opacity: 0.95; }'
    + '.ksvl-np-btn--toggle .ksvl-np-ico { opacity: 0.8; }'
    + '.ksvl-np-btn--toggle.is-active .ksvl-np-ico { opacity: 1; background: rgba(201,162,39,0.35); border-color: var(--gold, #c9a227); }'
    + '.ksvl-np-btn--toggle.is-active .ksvl-np-lbl { opacity: 1; color: var(--gold, #c9a227); }'
    + '.ksvl-np-btn--stop:hover .ksvl-np-ico { border-color: #ff9db4; color: #ffb8c9; background: rgba(255,157,180,0.12); }'
    + '@media (max-width: 860px) { .ksvl-np-lbl { display: none; } .ksvl-np-group + .ksvl-np-group { margin-left: 6px; padding-left: 8px; } }'
    + '@media (max-width: 720px) { .ksvl-np-btn--toggle { display: none; } }'
    + '@media (max-width: 620px) { .ksvl-np-info .ksvl-np-position { display: none; } .ksvl-now-playing { padding: 8px 12px; gap: 10px; flex-wrap: wrap; } .ksvl-np-info { flex: 1 1 calc(100% - 54px); } .ksvl-np-controls { flex: 1 1 100%; justify-content: center; } .ksvl-np-ico { width: 31px; height: 31px; } .ksvl-np-btn--play .ksvl-np-ico { width: 42px; height: 42px; } .ksvl-np-btn--link .ksvl-np-ico { display: none; } .ksvl-np-btn--link { display: none; } .ksvl-np-seek { width: 132px; } }';

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

  var np, npMini, npMix, npTrack, npPosition, npStatus, npRetry, npPlayBtn,
    npShuffleBtn, npRepeatBtn, npMuteBtn, npVolume, npSeek;

  function announce(message, kind) {
    ensureNowPlaying();
    npStatus.textContent = message || '';
    npStatus.dataset.kind = kind || 'status';
    npRetry.hidden = kind !== 'error';
    if (kind === 'error') {
      window.requestAnimationFrame(function() { npRetry.focus(); });
    }
    np.classList.add('is-visible');
  }

  function retryCurrent() {
    if (!state.lastFailure || !state.queue.length) return;
    state.lastFailure = null;
    announce('Retrying this admitted track…', 'loading');
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
    if (ico) ico.textContent = glyph; else btn.textContent = glyph;
  }
  function setBtnLabel(btn, label) {
    if (!btn) return;
    var lbl = btn.querySelector('.ksvl-np-lbl');
    if (lbl) lbl.textContent = label;
  }

  function ensureNowPlaying() {
    if (np) return np;
    np = el('div', {class: 'ksvl-now-playing'});
    npMini = el('div', {class: 'ksvl-np-cd-mini'});
    var info = el('div', {class: 'ksvl-np-info'});
    npMix = el('span', {class: 'ksvl-np-mix'});
    npTrack = el('span', {class: 'ksvl-np-track'});
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
    info.appendChild(npStatus);
    info.appendChild(npRetry);
    var controls = el('div', {class: 'ksvl-np-controls'});
    // Group 1 — the deck: shuffle · back · PLAY · next · repeat
    var deck = el('div', {class: 'ksvl-np-group'});
    npShuffleBtn = npButton('ksvl-np-btn--toggle', '🔀', 'Shuffle', {'aria-label': 'Shuffle · off', title: 'Shuffle', onclick: toggleShuffle});
    var prev = npButton('', '⏮', 'Back', {'aria-label': 'Previous track', title: 'Previous track', onclick: prevTrack});
    npPlayBtn = npButton('ksvl-np-btn--play', '⏸', 'Pause', {'aria-label': 'Pause', title: 'Play / Pause', onclick: togglePlay});
    var next = npButton('', '⏭', 'Next', {'aria-label': 'Next track', title: 'Next track', onclick: nextTrack});
    npRepeatBtn = npButton('ksvl-np-btn--toggle is-active', '🔁', 'Repeat', {'aria-label': 'Repeat all', title: 'Repeat', onclick: cycleRepeat});
    deck.appendChild(npShuffleBtn);
    deck.appendChild(prev);
    deck.appendChild(npPlayBtn);
    deck.appendChild(next);
    deck.appendChild(npRepeatBtn);
    controls.appendChild(deck);
    var sound = el('div', {class: 'ksvl-np-group'});
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
      'aria-label': 'Seek in current track',
      disabled: 'disabled'
    });
    npSeek.addEventListener('change', seekFromControl);
    sound.appendChild(npMuteBtn);
    sound.appendChild(npVolume);
    sound.appendChild(npSeek);
    controls.appendChild(sound);
    // Group 2 — station: pop out · KSVL · stop
    var station = el('div', {class: 'ksvl-np-group'});
    if (!IS_POPUP) {
      station.appendChild(npButton('ksvl-np-btn--link', '⧉', 'Pop out', {'aria-label': 'Pop out the player — music keeps playing while you browse', title: 'Pop out — music keeps playing while you browse', onclick: popOutPlayer}));
    }
    station.appendChild(npButton('ksvl-np-btn--link', '📻', 'KSVL', {href: '/radio.html', 'aria-label': 'Go to KSVL Radio', title: 'Open KSVL Radio'}));
    station.appendChild(npButton('ksvl-np-btn--stop', '✕', 'Stop', {'aria-label': 'Stop the music', title: 'Stop', onclick: stopPlayer}));
    controls.appendChild(station);
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
    if (state.mixId === 'single') {
      label = 'Now playing';
    } else if (state.mixId === 'live') {
      label = 'KSVL soundcheck · item ' + (state.index + 1);
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
    setBtnIcon(npPlayBtn, state.paused ? '▶' : '⏸');
    setBtnLabel(npPlayBtn, state.paused ? 'Play' : 'Pause');
    npPlayBtn.setAttribute('aria-label', state.paused ? 'Play' : 'Pause');
    if (state.paused) npMini.classList.add('is-paused');
    else npMini.classList.remove('is-paused');
    np.classList.toggle('is-live', state.mixId === 'live');
    np.classList.add('is-visible');
    updateCDPlayingClass();
    updateMediaSession(displayTitle, displayArtist);
  }

  function syncSoundControls() {
    if (!state.audio) return;
    if (npMuteBtn) {
      setBtnIcon(npMuteBtn, state.audio.muted ? '🔇' : '🔊');
      setBtnLabel(npMuteBtn, state.audio.muted ? 'Unmute' : 'Mute');
      npMuteBtn.setAttribute('aria-label', state.audio.muted ? 'Unmute' : 'Mute');
    }
    if (npVolume) npVolume.value = String(state.audio.volume);
    if (npSeek) {
      var duration = Number(state.audio.duration);
      npSeek.disabled = !Number.isFinite(duration) || duration <= 0;
      npSeek.value = npSeek.disabled ? '0' :
        String(Math.round((state.audio.currentTime / duration) * 1000));
    }
  }

  function toggleMute() {
    if (!state.audio) return;
    state.audio.muted = !state.audio.muted;
    state.muted = state.audio.muted;
    announce(state.audio.muted ? 'KSVL is muted.' : 'KSVL sound is on.', 'status');
    syncSoundControls();
    saveState();
  }

  function setVolumeFromControl() {
    var value = Math.max(0, Math.min(1, Number(npVolume.value)));
    state.volume = value;
    if (state.audio) {
      state.audio.volume = value;
      if (value > 0 && state.audio.muted) state.audio.muted = false;
      state.muted = state.audio.muted;
    }
    announce('Volume ' + Math.round(value * 100) + ' percent on this device.', 'status');
    syncSoundControls();
    saveState();
  }

  function seekFromControl() {
    if (!state.audio || !Number.isFinite(state.audio.duration) || state.audio.duration <= 0) {
      announce('This track does not provide usable seek metadata.', 'error');
      return;
    }
    try {
      state.audio.currentTime = (Number(npSeek.value) / 1000) * state.audio.duration;
      announce('Moved within ' + ((currentPart() || {}).title || 'the current track') + '.', 'status');
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
        album: 'KSVL 99.9 · SUNNYVAiLE Community RAiDIO',
        artwork: [{ src: '/assets/ksvl-media-artwork.png', sizes: '512x512', type: 'image/png' }]
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
    document.querySelectorAll('audio').forEach(function(a) { try { a.pause(); } catch(e) {} });
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
          // When no ♪ button is playing anymore (song ended or stopped),
          // the station comes back — like the DJ waiting out a request.
          // (.ksvl-cd is excluded: the active mix's CD keeps its class.)
          var watch = setInterval(function() {
            if (document.querySelector('button.is-playing:not(.ksvl-cd)')) return;
            clearInterval(watch);
            themeBtnActive = null;
            if (state.paused && state.audio) {
              state.audio.play().then(function() {
                state.paused = false;
                updateNowPlaying();
              }).catch(function() {});
            }
          }, 600);
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
        + '  background: var(--gold, #c9a227); color: #341446; font: 800 12px/1 "Jost", sans-serif;'
        + '  letter-spacing: 0.12em; text-transform: uppercase; white-space: nowrap;'
        + '  box-shadow: 0 8px 24px rgba(26, 8, 24, 0.35); cursor: pointer;'
        + '  animation: ksvlNudgePulse 1.5s ease-in-out infinite; }'
        + '@media (prefers-reduced-motion: reduce) { #' + NUDGE_ID + ' { animation: none; } }';
      document.head.appendChild(st);
    }
    var chip = document.createElement('div');
    chip.id = NUDGE_ID;
    chip.textContent = text || '▶ Tap anywhere — the radio keeps playing';
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
  var IS_POPUP = /ksvl-popup\.html$/.test(window.location.pathname);
  var POPUP_BEAT_KEY = 'laidies_ksvl_popup_beat';
  function popupActive() {
    if (IS_POPUP) return false;
    try { return (Date.now() - (+localStorage.getItem(POPUP_BEAT_KEY) || 0)) < 6000; } catch(e) { return false; }
  }
  if (IS_POPUP) {
    try { localStorage.setItem(POPUP_BEAT_KEY, String(Date.now())); } catch(e) {}
    setInterval(function() { try { localStorage.setItem(POPUP_BEAT_KEY, String(Date.now())); } catch(e) {} }, 2000);
    window.addEventListener('pagehide', function() { try { localStorage.removeItem(POPUP_BEAT_KEY); } catch(e) {} });
  }
  function popOutPlayer() {
    saveState();
    stopExistingAudio();
    state.queue = []; state.mixId = null; state.paused = false;
    if (np) { np.remove(); np = null; }
    window.open('/ksvl-popup.html', 'ksvlPopup', 'width=440,height=320,resizable=yes');
  }

  var playToken = 0;
  function playIndex(i) {
    state.index = ((i % state.queue.length) + state.queue.length) % state.queue.length;
    state.currentPart = 0;
    if (window.plausible) { try { window.plausible('KSVL play', { props: { track: (state.queue[state.index] || {}).title || '' } }); } catch (e) {} }
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
    if (!isAdmittedSource(src)) {
      state.paused = true;
      state.lastFailure = {kind: 'admission', src: src};
      announce('This item is held because its exact public rights and provenance record is not admitted.', 'error');
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
        announce(displayTitle + ' ended.', 'status');
        advanceOnEnded();
      }
    });
    audio.addEventListener('error', function(e) {
      if (myToken !== playToken) return;
      console.warn('[KSVL] Audio error on', src, e);
      state.paused = true;
      state.lastFailure = {kind: 'media', src: src};
      announce('This admitted track could not load or decode. Nothing was skipped; retry when you are ready.', 'error');
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
      announce('Playing ' + displayTitle + '.', 'playing');
      updateNowPlaying();
    });
    audio.addEventListener('pause', function() {
      if (myToken !== playToken || audio.ended) return;
      state.paused = true;
      announce(displayTitle + ' is paused.', 'status');
      updateNowPlaying();
    });
    state.audio = audio;
    if (state.restoring) {
      state.restoring = false;
      state.paused = true;
      announce('Saved KSVL position restored on this device. Press Play to resume; sound will not start automatically.', 'status');
      updateNowPlaying();
      syncSoundControls();
      return;
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
        announce('The browser blocked playback. Use Retry or Play to start this track with an explicit action.', 'error');
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
    if (state.mixId === 'single') { realStopPlayer(); return; }
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
      setBtnIcon(npRepeatBtn, state.repeatMode === 'one' ? '🔂' : '🔁');
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
    state.queue = queue.map(wrapWithIntro);
    // Jingles and intros remain held until independently admitted.
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

  // Play a SINGLE track through the KSVL deck. A song plays as itself — NOT the
  // station rotation — but still gets the persistent Now-Playing bar + pop-out,
  // so a specific song and the radio share one player. Used by the ♪ song chips.
  function startSingle(track) {
    if (!track || !track.src || !isAdmittedSource(track.src)) {
      announce('That track is not admitted by KSVL’s current public rights and provenance registry.', 'held');
      return false;
    }
    state.mixId = 'single';
    state.queue = [{ title: track.title || 'LAiDIES', artist: track.artist || 'LAiDIES', src: track.src }];
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

  function nextTrack() { if (state.queue.length) playIndex(state.index + 1); }
  function prevTrack() { if (state.queue.length) playIndex(state.index - 1); }

  function togglePlay() {
    if (!state.audio) return;
    if (state.paused) {
      announce('Starting ' + ((currentPart() || {}).title || 'this track') + '…', 'loading');
      state.audio.play().then(function() {
        state.paused = false;
        updateNowPlaying();
      }).catch(function(error) {
        state.paused = true;
        state.lastFailure = {kind: 'play', src: currentSrc()};
        announce(error && error.name === 'NotAllowedError' ?
          'The browser blocked playback. Try again from this Play control.' :
          'This track could not start. Nothing was counted or skipped.', 'error');
      });
    } else {
      state.audio.pause();
      state.paused = true;
      announce(((currentPart() || {}).title || 'This track') + ' is paused.', 'status');
      updateNowPlaying();
    }
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
    if (!trackCount) {
      playBtn.disabled = true;
      playBtn.setAttribute('aria-label', mix.title + ' is held pending track admission');
      playBtn.title = 'Held pending rights and provenance review';
    }
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
        el('p', {class: 'ksvl-mix-lede', text: TRACKS.length ?
          'A rack of admitted tracks. Sound starts only after your explicit Play choice; listening state stays on this device.' :
          'The public track shelf is held while exact masters, lyrics, lesson links and streaming rights complete owner review. No file is being presented as cleared merely because it exists.'}),
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
    if (!popupActive()) hydrateFromStorage();
    if (!TRACKS.length && (mountEl || IS_POPUP)) {
      announce(catalogFailure ||
        'No KSVL track currently clears the public rights and provenance admission gate.', 'held');
    }
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
      // A page that never owned playback must NOT clobber the stored state —
      // another window (the pop-out) or the previous page may own it.
      // Deliberate stops clear the key explicitly in realStopPlayer().
      if (!state.mixId || !state.queue.length) { return; }
      if (!activeRegistryId) { localStorage.removeItem(LS_KEY); return; }
      var ctx = null, extra = {};
      if (state.mixId.indexOf('album:') === 0) { ctx = 'album'; extra.artist = state.mixId.slice(6); }
      else if (MIXES.some(function(m){ return m.id === state.mixId; })) { ctx = 'mix'; extra.mixId = state.mixId; }
      else if (state.mixId === 'single') { return; }
      else { localStorage.removeItem(LS_KEY); return; }
      var track = state.queue[state.index];
      var currentTime = 0;
      try { if (state.audio && !isNaN(state.audio.currentTime)) currentTime = state.audio.currentTime; } catch(e) {}
      var payload = {
        v: 1,
        registryId: activeRegistryId,
        ctx: ctx,
        trackId: trackIdFor(track),
        currentTime: currentTime,
        paused: !!state.paused,
        shuffle: !!state.shuffle,
        repeatMode: state.repeatMode || 'all',
        volume: state.volume,
        muted: state.muted,
        savedAt: (new Date()).valueOf()
      };
      Object.keys(extra).forEach(function(k){ payload[k] = extra[k]; });
      localStorage.setItem(LS_KEY, JSON.stringify(payload));
    } catch(e) { /* localStorage quota / disabled — silently ignore */ }
  }

  function readSavedState() {
    function discard() {
      try { localStorage.removeItem(LS_KEY); } catch (error) {}
      return null;
    }
    try {
      var raw = localStorage.getItem(LS_KEY);
      if (!raw) return null;
      var s = JSON.parse(raw);
      var baseKeys = ['v','registryId','ctx','trackId','currentTime','paused','shuffle','repeatMode','volume','muted','savedAt'];
      var expectedKeys = s && s.ctx === 'mix' ? baseKeys.concat('mixId') :
        (s && s.ctx === 'album' ? baseKeys.concat('artist') : []);
      var now = Date.now();
      if (!s || !expectedKeys.length ||
          Object.keys(s).sort().join('|') !== expectedKeys.sort().join('|') ||
          s.v !== 1 || s.registryId !== activeRegistryId ||
          !['mix','album'].includes(s.ctx) ||
          typeof s.trackId !== 'string' || !s.trackId ||
          !Number.isFinite(s.currentTime) || s.currentTime < 0 ||
          typeof s.paused !== 'boolean' || typeof s.shuffle !== 'boolean' ||
          !['off','all','one'].includes(s.repeatMode) ||
          !Number.isFinite(s.volume) || s.volume < 0 || s.volume > 1 ||
          typeof s.muted !== 'boolean' ||
          !Number.isFinite(s.savedAt) || s.savedAt > now ||
          s.savedAt < now - STATE_TTL_MS ||
          (s.ctx === 'mix' && !MIXES.some(function(m) { return m.id === s.mixId; })) ||
          (s.ctx === 'album' && (typeof s.artist !== 'string' || !s.artist.trim()))) {
        return discard();
      }
      return s;
    } catch(e) { return discard(); }
  }

  function hydrateFromStorage() {
    var s = readSavedState();
    if (!s) return;
    // Build the queue for the saved context.
    var queue = null;
    if (s.ctx === 'mix') { queue = tracksForMix(s.mixId); }
    else if (s.ctx === 'album') { queue = tracksForArtist(s.artist); }
    if (!queue || !queue.length) {
      try { localStorage.removeItem(LS_KEY); } catch (error) {}
      return;
    }
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
    state.mixId = (s.ctx === 'album') ? ('album:' + s.artist) : s.mixId;
    state.queue = queue.map(wrapWithIntro);
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
    // Play through the current track, seeking on canplay to the saved position.
    state.restoring = true;
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
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mount, {once: true});
      } else {
        mount();
      }
    });
  }
  boot();
})();
