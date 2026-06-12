/* ═══════════════════════════════════════════════════════════════
   LAIDIES Mini Player – Persistent Cross-Page Music Player
   Single-track enforcement + Spotify pause + localStorage state
   ═══════════════════════════════════════════════════════════════ */

(function() {
  'use strict';

  // ── Playlist ──────────────────────────────────────────────────
  const LAIDIES_TRACKS = [
    { src: '/content/music/dj-jaidy-week-01-on-wednesday-we-do-ai.mp3', title: 'On Wednesdays We Do AI' },
    { src: '/content/music/dj-jaidy-week-02-tell-me-what-you-want.mp3', title: 'Tell Me What You Want' },
    { src: '/content/music/dj-jaidy-impossible-to-underestimate-you.mp3', title: 'Impossible to Underestimate You' },
    { src: '/content/music/debs-tomorrow-problem.mp3', title: "Tomorrow\'s Problem" }
  ];

  const STORAGE_KEY = 'laidies-mini-player';

  // ── State ─────────────────────────────────────────────────────
  let currentAudio = null;
  let currentTitle = '';
  let currentSrc = '';
  let isPlaying = false;
  let saveInterval = null;
  let repeatMode = 'off'; // 'off' | 'all' | 'one'

  // ── Build the DOM ─────────────────────────────────────────────
  function buildPlayerDOM() {
    if (document.getElementById('laidies-mini-player')) return;

    const bar = document.createElement('div');
    bar.id = 'laidies-mini-player';
    bar.innerHTML = `
      <div class="mp-progress-wrap" id="mp-progress-wrap">
        <div class="mp-progress-bar" id="mp-progress-bar"></div>
      </div>
      <div class="mp-controls">
        <button class="mp-btn mp-btn-prev" id="mp-btn-prev" title="Previous">&#9198;</button>
        <button class="mp-btn mp-btn-play" id="mp-btn-play" title="Play/Pause">&#9654;</button>
        <button class="mp-btn mp-btn-next" id="mp-btn-next" title="Next">&#9197;</button>
      </div>
      <div class="mp-track-info">
        <div class="mp-track-title" id="mp-track-title">No track</div>
      </div>
      <button class="mp-btn mp-btn-repeat" id="mp-btn-repeat" title="Repeat: Off" aria-label="Repeat mode">&#128257;</button>
      <button class="mp-btn mp-btn-close" id="mp-btn-close" title="Close player">&times;</button>
    `;
    document.body.appendChild(bar);

    // Event listeners
    document.getElementById('mp-btn-play').addEventListener('click', togglePlayPause);
    document.getElementById('mp-btn-prev').addEventListener('click', playPrev);
    document.getElementById('mp-btn-next').addEventListener('click', playNext);
    document.getElementById('mp-btn-close').addEventListener('click', closePlayer);
    document.getElementById('mp-btn-repeat').addEventListener('click', cycleRepeat);
    document.getElementById('mp-progress-wrap').addEventListener('click', seekTrack);
  }

  // ── Show / Hide ───────────────────────────────────────────────
  function showPlayer() {
    const bar = document.getElementById('laidies-mini-player');
    if (bar) {
      bar.classList.add('visible');
      document.body.classList.add('mp-active');
    }
  }

  function hidePlayer() {
    const bar = document.getElementById('laidies-mini-player');
    if (bar) {
      bar.classList.remove('visible');
      document.body.classList.remove('mp-active');
    }
  }

  // ── Update UI ─────────────────────────────────────────────────
  function updateUI() {
    const titleEl = document.getElementById('mp-track-title');
    const playBtn = document.getElementById('mp-btn-play');
    if (titleEl) {
      titleEl.textContent = currentTitle || 'No track';
      // Check if scrolling needed
      titleEl.classList.toggle('scrolling', titleEl.scrollWidth > titleEl.parentElement.offsetWidth);
    }
    if (playBtn) {
      playBtn.innerHTML = isPlaying ? '&#9208;' : '&#9654;';
      playBtn.title = isPlaying ? 'Pause' : 'Play';
    }
  }

  function updateProgress() {
    if (!currentAudio || !currentAudio.duration) return;
    const pct = (currentAudio.currentTime / currentAudio.duration) * 100;
    const bar = document.getElementById('mp-progress-bar');
    if (bar) bar.style.width = pct + '%';
  }


  // ── Repeat Mode ─────────────────────────────────────────────────────
  function cycleRepeat() {
    if (repeatMode === 'off') repeatMode = 'all';
    else if (repeatMode === 'all') repeatMode = 'one';
    else repeatMode = 'off';
    updateRepeatUI();
  }

  function updateRepeatUI() {
    var btn = document.getElementById('mp-btn-repeat');
    if (!btn) return;

    // Remove existing badge/label
    var oldBadge = btn.querySelector('.mp-repeat-badge');
    var oldLabel = btn.querySelector('.mp-repeat-label');
    if (oldBadge) oldBadge.remove();
    if (oldLabel) oldLabel.remove();

    // Pulse animation
    btn.style.transform = 'scale(1.2)';
    setTimeout(function() { btn.style.transform = 'scale(1)'; }, 150);

    if (repeatMode === 'off') {
      btn.style.opacity = '0.5';
      btn.style.color = '#ffffff';
      btn.title = 'Repeat: Off';
    } else if (repeatMode === 'all') {
      btn.style.opacity = '1';
      btn.style.color = '#ff2d9b';
      btn.title = 'Repeat: All';
      // Add "ALL" label below
      var label = document.createElement('span');
      label.className = 'mp-repeat-label';
      label.textContent = 'ALL';
      label.style.cssText = 'position:absolute;bottom:-2px;left:50%;transform:translateX(-50%);font-size:0.55rem;font-weight:700;text-transform:uppercase;color:#ff2d9b;pointer-events:none;';
      btn.style.position = 'relative';
      btn.appendChild(label);
    } else if (repeatMode === 'one') {
      btn.style.opacity = '1';
      btn.style.color = '#ff2d9b';
      btn.title = 'Repeat: One';
      // Add "1" badge (small circle)
      var badge = document.createElement('span');
      badge.className = 'mp-repeat-badge';
      badge.textContent = '1';
      badge.style.cssText = 'position:absolute;top:2px;right:2px;width:14px;height:14px;border-radius:50%;background:#ff2d9b;color:#fff;font-size:0.55rem;font-weight:700;display:flex;align-items:center;justify-content:center;pointer-events:none;line-height:1;';
      btn.style.position = 'relative';
      btn.appendChild(badge);
    }
  }

  // ── Seek ──────────────────────────────────────────────────────
  function seekTrack(e) {
    if (!currentAudio || !currentAudio.duration) return;
    const wrap = document.getElementById('mp-progress-wrap');
    const rect = wrap.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    currentAudio.currentTime = pct * currentAudio.duration;
  }

  // ── Play / Pause ──────────────────────────────────────────────
  function togglePlayPause() {
    if (!currentAudio) return;
    if (isPlaying) {
      currentAudio.pause();
    } else {
      currentAudio.play().catch(function() {});
    }
  }

  // ── Prev / Next ───────────────────────────────────────────────
  function findCurrentIndex() {
    const normalized = normalizeSrc(currentSrc);
    for (let i = 0; i < LAIDIES_TRACKS.length; i++) {
      if (normalized.indexOf(LAIDIES_TRACKS[i].src) !== -1 ||
          LAIDIES_TRACKS[i].src.indexOf(normalized.split('/').pop()) !== -1 ||
          normalized.endsWith(LAIDIES_TRACKS[i].src)) {
        return i;
      }
    }
    // Try matching by filename
    const filename = normalized.split('/').pop();
    for (let i = 0; i < LAIDIES_TRACKS.length; i++) {
      if (LAIDIES_TRACKS[i].src.split('/').pop() === filename) return i;
    }
    return -1;
  }

  function normalizeSrc(src) {
    try {
      const url = new URL(src, window.location.origin);
      return url.pathname;
    } catch(e) {
      return src;
    }
  }

  function playTrackByIndex(idx) {
    if (idx < 0 || idx >= LAIDIES_TRACKS.length) return;
    const track = LAIDIES_TRACKS[idx];
    loadAndPlay(track.src, track.title, 0, true);
  }

  function playPrev() {
    const idx = findCurrentIndex();
    if (idx === -1) return;
    const prev = (idx - 1 + LAIDIES_TRACKS.length) % LAIDIES_TRACKS.length;
    playTrackByIndex(prev);
  }

  function playNext() {
    const idx = findCurrentIndex();
    if (idx === -1) return;
    const next = (idx + 1) % LAIDIES_TRACKS.length;
    playTrackByIndex(next);
  }

  // ── Load and play a track ─────────────────────────────────────
  function loadAndPlay(src, title, time, autoplay) {
    // Pause all other audio elements on page
    pauseAllAudio();

    if (!currentAudio) {
      currentAudio = new Audio();
      currentAudio.addEventListener('timeupdate', updateProgress);
      currentAudio.addEventListener('play', function() {
        isPlaying = true;
        updateUI();
        startSaveInterval();
      });
      currentAudio.addEventListener('pause', function() {
        isPlaying = false;
        updateUI();
        saveState();
      });
      currentAudio.addEventListener('ended', function() {
        if (repeatMode === 'one') {
          // Repeat same track
          currentAudio.currentTime = 0;
          currentAudio.play().catch(function() {});
          return;
        }
        isPlaying = false;
        updateUI();
        // Auto-advance to next track (or loop playlist if repeat all)
        const idx = findCurrentIndex();
        if (idx !== -1) {
          const next = (idx + 1) % LAIDIES_TRACKS.length;
          if (repeatMode === 'off' && next === 0) {
            // Don't loop back to beginning if repeat is off
            saveState();
            return;
          }
          playTrackByIndex(next);
        }
      });
    }

    currentSrc = src;
    currentTitle = title;

    if (currentAudio.src !== new URL(src, window.location.origin).href) {
      currentAudio.src = src;
      currentAudio.load();
    }

    currentAudio.currentTime = time || 0;

    if (autoplay) {
      currentAudio.play().catch(function() {
        // Autoplay blocked — show paused state
        isPlaying = false;
        updateUI();
      });
    }

    showPlayer();
    updateUI();
    saveState();
  }

  // ── Close player ──────────────────────────────────────────────
  function closePlayer() {
    if (currentAudio) {
      currentAudio.pause();
    }
    isPlaying = false;
    hidePlayer();
    clearState();
    stopSaveInterval();
  }

  // ── Pause all audio on page ───────────────────────────────────
  function pauseAllAudio() {
    const audios = document.querySelectorAll('audio');
    audios.forEach(function(a) {
      if (a !== currentAudio && !a.paused) {
        a.pause();
      }
    });
  }

  // ── localStorage persistence ──────────────────────────────────
  function saveState() {
    const state = {
      playing: isPlaying,
      src: currentSrc,
      time: currentAudio ? currentAudio.currentTime : 0,
      title: currentTitle
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch(e) {}
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch(e) {
      return null;
    }
  }

  function clearState() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch(e) {}
  }

  function startSaveInterval() {
    stopSaveInterval();
    saveInterval = setInterval(function() {
      if (isPlaying) saveState();
    }, 2000);
  }

  function stopSaveInterval() {
    if (saveInterval) {
      clearInterval(saveInterval);
      saveInterval = null;
    }
  }

  // ── Detect track title from page audio element ────────────────
  function detectTitle(audioEl) {
    // 1. data-title attribute
    if (audioEl.dataset && audioEl.dataset.title) return audioEl.dataset.title;

    // 2. Check playlist
    const src = normalizeSrc(audioEl.src || audioEl.currentSrc);
    for (let i = 0; i < LAIDIES_TRACKS.length; i++) {
      if (src.endsWith(LAIDIES_TRACKS[i].src) || src.indexOf(LAIDIES_TRACKS[i].src) !== -1) {
        return LAIDIES_TRACKS[i].title;
      }
      // Match by filename
      const trackFile = LAIDIES_TRACKS[i].src.split('/').pop();
      const srcFile = src.split('/').pop();
      if (trackFile === srcFile) return LAIDIES_TRACKS[i].title;
    }

    // 3. Closest text element
    const parent = audioEl.closest('[data-title], .track, .song, .audio-item, figure, .card');
    if (parent) {
      const heading = parent.querySelector('h1, h2, h3, h4, h5, .title, .track-title, figcaption');
      if (heading && heading.textContent.trim()) return heading.textContent.trim();
    }

    // 4. Extract from filename
    const filename = src.split('/').pop().replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
    return filename || 'Unknown Track';
  }

  // ══════════════════════════════════════════════════════════════
  //  SINGLE-TRACK ENFORCEMENT (capture phase)
  // ══════════════════════════════════════════════════════════════
  document.addEventListener('play', function(e) {
    if (!(e.target instanceof HTMLAudioElement)) return;
    const playingAudio = e.target;

    // Pause all OTHER audio elements
    const audios = document.querySelectorAll('audio');
    audios.forEach(function(a) {
      if (a !== playingAudio && !a.paused) {
        a.pause();
      }
    });

    // Also pause our internal player audio if different
    if (currentAudio && currentAudio !== playingAudio && !currentAudio.paused) {
      currentAudio.pause();
    }

    // Adopt this audio into the mini player
    const src = playingAudio.src || playingAudio.currentSrc;
    const title = detectTitle(playingAudio);

    currentAudio = playingAudio;
    currentSrc = src;
    currentTitle = title;
    isPlaying = true;

    // Attach listeners if not already
    if (!playingAudio._mpListenersAttached) {
      playingAudio.addEventListener('timeupdate', updateProgress);
      playingAudio.addEventListener('pause', function() {
        if (currentAudio === playingAudio) {
          isPlaying = false;
          updateUI();
          saveState();
        }
      });
      playingAudio.addEventListener('ended', function() {
        if (currentAudio === playingAudio) {
          if (repeatMode === 'one') {
            currentAudio.currentTime = 0;
            currentAudio.play().catch(function() {});
            return;
          }
          isPlaying = false;
          updateUI();
          const idx = findCurrentIndex();
          if (idx !== -1) {
            const next = (idx + 1) % LAIDIES_TRACKS.length;
            if (repeatMode === 'off' && next === 0) {
              saveState();
              return;
            }
            playTrackByIndex(next);
          }
        }
      });
      playingAudio._mpListenersAttached = true;
    }

    showPlayer();
    updateUI();
    startSaveInterval();
    saveState();
  }, true); // capture phase!

  // ══════════════════════════════════════════════════════════════
  //  SPOTIFY LINK DETECTION (capture phase)
  // ══════════════════════════════════════════════════════════════
  document.addEventListener('click', function(e) {
    let target = e.target;
    let anchor = null;

    // Walk up to find <a> element
    while (target && target !== document) {
      if (target.tagName === 'A') {
        anchor = target;
        break;
      }
      target = target.parentElement;
    }

    if (!anchor) return;
    const href = anchor.href || anchor.getAttribute('href') || '';

    if (href.indexOf('spotify.com') !== -1 || href.indexOf('open.spotify') !== -1) {
      // Pause current audio
      if (currentAudio && !currentAudio.paused) {
        currentAudio.pause();
      }
      isPlaying = false;
      updateUI();
      saveState(); // saves with playing: false
    }
  }, true); // capture phase!

  // ══════════════════════════════════════════════════════════════
  //  INITIALIZATION – Restore state on page load
  // ══════════════════════════════════════════════════════════════
  function init() {
    buildPlayerDOM();
    updateRepeatUI();

    const state = loadState();
    if (!state || !state.src) return;

    if (state.playing) {
      // Was playing — restore and auto-play
      loadAndPlay(state.src, state.title, state.time, true);
    } else {
      // Was paused (e.g., Spotify click) — show bar in paused state
      currentSrc = state.src;
      currentTitle = state.title;

      currentAudio = new Audio();
      currentAudio.src = state.src;
      currentAudio.currentTime = state.time || 0;
      currentAudio.addEventListener('timeupdate', updateProgress);
      currentAudio.addEventListener('play', function() {
        isPlaying = true;
        updateUI();
        startSaveInterval();
      });
      currentAudio.addEventListener('pause', function() {
        isPlaying = false;
        updateUI();
        saveState();
      });
      currentAudio.addEventListener('ended', function() {
        if (repeatMode === 'one') {
          currentAudio.currentTime = 0;
          currentAudio.play().catch(function() {});
          return;
        }
        isPlaying = false;
        updateUI();
        const idx = findCurrentIndex();
        if (idx !== -1) {
          const next = (idx + 1) % LAIDIES_TRACKS.length;
          if (repeatMode === 'off' && next === 0) {
            saveState();
            return;
          }
          playTrackByIndex(next);
        }
      });

      isPlaying = false;
      showPlayer();
      updateUI();
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
