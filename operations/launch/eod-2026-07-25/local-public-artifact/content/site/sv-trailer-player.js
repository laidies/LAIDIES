/* sv-trailer-player.js — the Trailer ("Welcome to SUNNYVAiLE") audio player.
   Drop a placeholder anywhere: <div data-sv-trailer-player></div>
   Self-contained: own <audio>, scoped styles, seekable bar, no autoplay.
   On play it pauses every other <audio> on the page (incl. the KSVL player). */
(function () {
  'use strict';
  var SRC = '/content/music/trailer-narration.mp3';

  function fmt(t) {
    if (!isFinite(t) || t < 0) t = 0;
    var m = Math.floor(t / 60), s = Math.floor(t % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  function injectStyle() {
    if (document.getElementById('svtp-style')) return;
    var css = ''
      + '.svtp{max-width:560px;margin:24px 0;padding:20px 22px;border:1.5px solid var(--gold,#c8a24a);'
      + 'border-radius:14px;background:var(--cream,#fbf6ef);display:flex;gap:18px;align-items:center;'
      + 'font-family:inherit;box-shadow:0 6px 18px rgba(75,33,72,0.08);}'
      + '.svtp-btn{flex:0 0 auto;width:58px;height:58px;border-radius:50%;border:0;cursor:pointer;'
      + 'background:var(--plum,#4b2148);color:var(--pearl,#fff);display:flex;align-items:center;'
      + 'justify-content:center;transition:transform .15s ease,background .2s ease;}'
      + '.svtp-btn:hover{background:var(--rose,#9b3f5f);transform:scale(1.05);}'
      + '.svtp-btn svg{width:24px;height:24px;fill:currentColor;}'
      + '.svtp .svtp-pause{display:none;}'
      + '.svtp.is-playing .svtp-play{display:none;}'
      + '.svtp.is-playing .svtp-pause{display:block;}'
      + '.svtp-body{flex:1 1 auto;min-width:0;}'
      + '.svtp-eyebrow{margin:0;font-family:"Jost",sans-serif;font-size:10px;font-weight:800;'
      + 'letter-spacing:.22em;text-transform:uppercase;color:var(--rose,#9b3f5f);}'
      + '.svtp-title{margin:2px 0 2px;font-family:"Playfair Display",Georgia,serif;font-size:20px;'
      + 'font-weight:700;color:var(--plum-deep,#3a1838);line-height:1.15;}'
      + '.svtp-title .ai{color:var(--rose,#9b3f5f);}'
      + '.svtp-cap{margin:0 0 12px;font-size:12.5px;line-height:1.4;color:var(--plum-soft,#6b4668);}'
      + '.svtp-bar{position:relative;height:8px;border-radius:999px;background:rgba(75,33,72,0.14);'
      + 'cursor:pointer;overflow:hidden;}'
      + '.svtp-fill{position:absolute;left:0;top:0;bottom:0;width:0;border-radius:999px;'
      + 'background:linear-gradient(90deg,var(--rose,#9b3f5f),var(--gold,#c8a24a));}'
      + '.svtp-times{display:flex;justify-content:space-between;margin-top:6px;'
      + 'font-family:"Jost",sans-serif;font-size:11px;font-weight:700;color:var(--plum-soft,#6b4668);'
      + 'font-variant-numeric:tabular-nums;}'
      + '@media(max-width:480px){.svtp{flex-direction:column;align-items:stretch;text-align:left;}}';
    var st = document.createElement('style');
    st.id = 'svtp-style';
    st.textContent = css;
    document.head.appendChild(st);
  }

  var PLAY = '<svg class="svtp-play" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
  var PAUSE = '<svg class="svtp-pause" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>';

  function build(host) {
    if (host.dataset.svtpReady) return;
    host.dataset.svtpReady = '1';
    host.classList.add('svtp');
    host.innerHTML =
      '<button class="svtp-btn" type="button" aria-label="Play the Trailer">' + PLAY + PAUSE + '</button>'
      + '<div class="svtp-body">'
      + '<p class="svtp-eyebrow">★ The Trailer</p>'
      + '<p class="svtp-title">Welcome to SUNNYV<span class="ai">Ai</span>LE</p>'
      + '<p class="svtp-cap">Press play for the full audio tour of town — the show, the streets, and how a Wednesday works.</p>'
      + '<div class="svtp-bar" role="slider" aria-label="Seek" tabindex="0" aria-valuemin="0" aria-valuenow="0"><div class="svtp-fill"></div></div>'
      + '<div class="svtp-times"><span class="svtp-cur">0:00</span><span class="svtp-dur">--:--</span></div>'
      + '<audio preload="metadata" src="' + SRC + '"></audio>'
      + '</div>';

    var audio = host.querySelector('audio');
    var btn = host.querySelector('.svtp-btn');
    var bar = host.querySelector('.svtp-bar');
    var fill = host.querySelector('.svtp-fill');
    var cur = host.querySelector('.svtp-cur');
    var dur = host.querySelector('.svtp-dur');

    audio.addEventListener('loadedmetadata', function () { dur.textContent = fmt(audio.duration); });

    btn.addEventListener('click', function () {
      if (audio.paused) {
        // pause everything else that could bleed over the trailer
        document.querySelectorAll('audio').forEach(function (a) { if (a !== audio) { try { a.pause(); } catch (e) {} } });
        try { if (window.svKsvlStop) window.svKsvlStop(); } catch (e) {}
        audio.play();
      } else {
        audio.pause();
      }
    });

    audio.addEventListener('play', function () { host.classList.add('is-playing'); });
    audio.addEventListener('pause', function () { host.classList.remove('is-playing'); });
    audio.addEventListener('ended', function () { host.classList.remove('is-playing'); });
    audio.addEventListener('timeupdate', function () {
      cur.textContent = fmt(audio.currentTime);
      var pct = audio.duration ? (audio.currentTime / audio.duration * 100) : 0;
      fill.style.width = pct + '%';
      bar.setAttribute('aria-valuenow', Math.round(pct));
    });

    function seekTo(clientX) {
      var r = bar.getBoundingClientRect();
      var pct = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
      if (audio.duration) audio.currentTime = pct * audio.duration;
    }
    bar.addEventListener('click', function (e) { seekTo(e.clientX); });
    bar.addEventListener('keydown', function (e) {
      if (!audio.duration) return;
      if (e.key === 'ArrowRight') { audio.currentTime = Math.min(audio.duration, audio.currentTime + 15); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { audio.currentTime = Math.max(0, audio.currentTime - 15); e.preventDefault(); }
    });
  }

  function init() {
    injectStyle();
    document.querySelectorAll('[data-sv-trailer-player]').forEach(build);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
