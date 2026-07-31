/**
 * SUNNYVAiLE homepage behaviours (2026-07 redesign).
 *  - mobile menu, activity filters, district tabs
 *  - interactive town map popups
 *  - song chips that play through a DOM <audio> (adopted by mini-player.js)
 *  - Wednesday route progress paint (reads window.svTour from sv-tour-checkin.js)
 *  - published episode fallback presentation (editorial release data is backstage)
 *  - window.svShowResume(epTitle, href) hook for signed-in resume state
 *
 * Platform release projections, receipts, hashes and failure codes must not
 * provide Homepage visitor copy or presentation.
 */
(function () {
  'use strict';

  var WEEKLY_SONG = {
    ep: 4,
    title: 'It Was Women All Along',
    src: '/content/music/dj-jaidy-week-04-it-was-women-all-along.mp3'
  };

  /* ---------- latest-episode links: published index, static fallback in HTML ---------- */
  (function () {
    var links = document.querySelectorAll('[data-latest-episode-link]');
    if (!links.length) return;
    fetch('/content/episode-index.json').then(function (response) {
      if (!response.ok) throw new Error('Episode index unavailable (' + response.status + ')');
      return response.json();
    }).then(function (data) {
      var published = (data.episodes || []).filter(function (episode) {
        return episode.status === 'published' &&
          Number.isFinite(Number(episode.number)) &&
          typeof episode.issueUrl === 'string' &&
          /^issues\/issue-[a-z0-9-]+\.html$/i.test(episode.issueUrl);
      }).sort(function (a, b) {
        return Number(a.number) - Number(b.number);
      });
      if (!published.length) return;
      var latest = published[published.length - 1];
      links.forEach(function (link) {
        link.href = '/' + latest.issueUrl;
        link.setAttribute('aria-label', 'Latest Episode: ' + latest.title);
      });
    }).catch(function () {
      /* Keep the last known published route already present in the HTML. */
    });
  })();

  /* ---------- menu / filters / district tabs ---------- */
  var menu = document.querySelector('.menu');
  var mobile = document.querySelector('#mobile-nav');
  if (menu && mobile) {
    menu.addEventListener('click', function () {
      var open = menu.getAttribute('aria-expanded') === 'true';
      menu.setAttribute('aria-expanded', String(!open));
      mobile.hidden = open;
    });
    mobile.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobile.hidden = true;
        menu.setAttribute('aria-expanded', 'false');
      });
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
        mobile.hidden = true;
        menu.setAttribute('aria-expanded', 'false');
        menu.focus();
      }
    });
  }

  document.querySelectorAll('.filter button').forEach(function (button) {
    button.addEventListener('click', function () {
      document.querySelectorAll('.filter button').forEach(function (b) { b.classList.remove('active'); });
      button.classList.add('active');
      var filter = button.dataset.filter;
      document.querySelectorAll('.activity-grid article').forEach(function (card) {
        card.hidden = filter !== 'all' && !(card.dataset.tags || '').includes(filter);
      });
    });
  });

  document.querySelectorAll('.district-tabs button').forEach(function (button) {
    button.addEventListener('click', function () {
      document.querySelectorAll('.district-tabs button').forEach(function (b) { b.setAttribute('aria-selected', 'false'); });
      button.setAttribute('aria-selected', 'true');
      var view = document.querySelector('.district-view');
      if (!view) return;
      view.querySelector('img').src = button.dataset.image;
      view.querySelector('img').alt = button.dataset.title;
      view.querySelector('h3').textContent = button.dataset.title;
      view.querySelector('p').textContent = button.dataset.copy;
    });
  });

  /* lookup form → the LIBRAiRY reference desk (Miss Jeeves) */
  var refForm = document.querySelector('.reference form');
  if (refForm) {
    refForm.addEventListener('submit', function (e) {
      e.preventDefault();
      window.location.href = '/library.html';
    });
  }

  /* ---------- town map popups ---------- */
  (function () {
    var wrap = document.querySelector('.map-wrap');
    if (!wrap) return;
    var pop = wrap.querySelector('.map-pop');
    var h4 = pop.querySelector('h4'), p = pop.querySelector('p'), a = pop.querySelector('a');
    wrap.querySelectorAll('.map-spot').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        h4.textContent = b.dataset.name; p.textContent = b.dataset.desc; a.href = b.dataset.href;
        pop.hidden = false;
        var W = wrap.clientWidth, H = wrap.clientHeight;
        var bx = b.offsetLeft + b.offsetWidth / 2;
        var left = bx - pop.offsetWidth / 2;
        left = Math.max(10, Math.min(left, W - pop.offsetWidth - 10));
        var top = b.offsetTop - pop.offsetHeight - 10;
        if (top < 10) top = Math.min(b.offsetTop + b.offsetHeight + 10, H - pop.offsetHeight - 10);
        pop.style.left = left + 'px'; pop.style.top = top + 'px';
      });
    });
    document.addEventListener('click', function (e) { if (!pop.hidden && !pop.contains(e.target)) pop.hidden = true; });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') pop.hidden = true; });
  })();

  /* ---------- song chips → DOM <audio>, adopted by mini-player ---------- */
  (function () {
    var chips = document.querySelectorAll('.play-chip');
    if (!chips.length) return;
    var audio = document.createElement('audio');
    audio.preload = 'none';
    document.body.appendChild(audio);
    var current = null;
    function setIcon(chip, playing) {
      if (chip) chip.querySelector('.pc-icon').innerHTML = playing ? '&#10074;&#10074;' : '&#9654;';
    }
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        // Route through the KSVL player so the song plays as ITSELF (not the
        // radio rotation) with the persistent bar + pop-out. Falls back to the
        // inline audio only if the KSVL player isn't present.
        if (window.KSVL_playTrack) {
          window.KSVL_playTrack(chip.dataset.audio, chip.dataset.title || '', 'LAiDIES');
          setIcon(current, false); current = chip; setIcon(chip, true);
          return;
        }
        if (current === chip && !audio.paused) { audio.pause(); setIcon(chip, false); return; }
        setIcon(current, false);
        if (current !== chip) { audio.src = chip.dataset.audio; audio.dataset.title = chip.dataset.title || ''; }
        current = chip; audio.play(); setIcon(chip, true);
      });
    });
    audio.addEventListener('pause', function () { setIcon(current, false); });
    audio.addEventListener('play', function () { setIcon(current, true); });
    audio.addEventListener('ended', function () { setIcon(current, false); });
  })();

  /* ---------- Wednesday route progress paint ---------- */
  (function () {
    function paint() {
      if (!window.svTour || typeof window.svTour.getState !== 'function') { setTimeout(paint, 120); return; }
      var st = window.svTour.getState();
      var done = {};
      (st.stops || []).forEach(function (s) { if (s.checked) done[s.key] = true; });
      document.querySelectorAll('.ritual li[data-stop]').forEach(function (li) {
        li.classList.toggle('stop-done', !!done[li.dataset.stop]);
      });
    }
    paint();
    document.addEventListener('sv:tour-checkin', paint);
  })();

  /* ---------- season panel: fixed published fallback ---------- */
  (function () {
    var track = document.querySelector('.season-track');
    var heading = document.querySelector('.fc-default h3');
    if (!track || !heading) return;
    heading.textContent = 'Episode 04 · The Founding Mothers';
    track.querySelectorAll('.st-current em').forEach(function (label) {
      label.textContent = 'Previously published';
    });
    var readBtn = document.querySelector('.fc-default .fc-btn-teal');
    var listenBtn = document.querySelector('.fc-default .fc-btn-coral');
    if (readBtn) { readBtn.href = '/issues/issue-04.html'; readBtn.textContent = 'Read Episode 04 →'; }
    if (listenBtn) { listenBtn.href = '/watch.html?ep=04'; listenBtn.textContent = 'Listen to Episode 04 →'; }
  })();

  /* ---------- signed-in resume hook (wired to member_issue_progress later) ---------- */
  window.svShowResume = function (epTitle, href) {
    var d = document.querySelector('.fc-default'), r = document.querySelector('.fc-resume');
    if (!d || !r) return;
    r.querySelector('.fc-resume-title').textContent = epTitle;
    if (href) r.querySelector('.fc-resume-link').href = href;
    d.hidden = true; r.hidden = false;
  };
})();
