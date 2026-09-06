/**
 * SUNNYVAiLE homepage behaviours (2026-07 redesign).
 *  - mobile menu, activity filters, district tabs
 *  - interactive town map popups
 *  - KSVL links remain ordinary navigation; the canonical KSVL deck owns audio
 *  - Wednesday route progress paint (reads window.svTour from sv-tour-checkin.js)
 *  - published episode fallback presentation (editorial release data is backstage)
 *  - signed-in Resident continuation in the weekly panel and quick switchboard
 *  - current NewsStand preview with an honest archive fallback
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

  /* ---------- approved first-visit dial-up arrival ---------- */
  (function () {
    var arrival = document.querySelector('[data-home-arrival]');
    if (!arrival) return;
    var video = arrival.querySelector('video');
    var pause = arrival.querySelector('[data-arrival-pause]');
    var skip = arrival.querySelector('[data-arrival-skip]');
    if (!video || !pause || !skip) return;

    var key = 'laidies_home_ident_seen';
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var closed = false;
    var safetyTimer = 0;

    function storeSeen() {
      try { window.sessionStorage.setItem(key, '1'); } catch (error) { /* Static masthead remains the fallback. */ }
    }
    function wasSeen() {
      try { return window.sessionStorage.getItem(key) === '1'; } catch (error) { return true; }
    }
    function closeArrival() {
      if (closed) return;
      closed = true;
      window.clearTimeout(safetyTimer);
      storeSeen();
      video.pause();
      arrival.hidden = true;
    }
    function startArrival() {
      if (reduced || wasSeen()) {
        storeSeen();
        arrival.hidden = true;
        return;
      }
      closed = false;
      arrival.hidden = false;
      video.currentTime = 0;
      safetyTimer = window.setTimeout(closeArrival, 7000);
      var started = video.play();
      if (started && typeof started.catch === 'function') started.catch(closeArrival);
    }
    function armSafetyTimer() {
      window.clearTimeout(safetyTimer);
      safetyTimer = window.setTimeout(closeArrival, 7000);
    }

    pause.addEventListener('click', function () {
      if (video.paused) {
        var resumed = video.play();
        if (resumed && typeof resumed.catch === 'function') resumed.catch(closeArrival);
        armSafetyTimer();
        pause.textContent = 'Pause arrival';
      } else {
        video.pause();
        window.clearTimeout(safetyTimer);
        pause.textContent = 'Resume arrival';
      }
    });
    skip.addEventListener('click', closeArrival);
    video.addEventListener('ended', closeArrival);
    video.addEventListener('error', closeArrival);
    startArrival();
  })();

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
    var refInput = refForm.querySelector('#lookup');
    refForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!refInput) return;
      var query = refInput.value.trim();
      if (!query) {
        refInput.focus();
        return;
      }
      window.location.href = '/library.html#miss-jeeves?q=' + encodeURIComponent(query.slice(0, 240)) + '&from=homepage';
    });
  }

  /* ---------- linked town map and building directory ---------- */
  (function () {
    var town = document.getElementById('town');
    if (!town) return;
    var dialog = town.querySelector('#town-building-dialog');
    var list = town.querySelector('.building-directory ul');
    if (!dialog || !list) return;
    var spots = Array.from(town.querySelectorAll('.map-spot'));
    var links = Array.from(list.querySelectorAll('[data-building-link]'));
    var caption = town.querySelector('.building-map-caption');
    var title = dialog.querySelector('h3'), description = dialog.querySelector('p');
    var address = dialog.querySelector('.building-dialog-address');
    var detailImage = dialog.querySelector('.building-detail-image');
    var go = dialog.querySelector('.building-go'), close = dialog.querySelector('.building-close');
    var entries = links.map(function (link, index) {
      var spot = spots.find(function (candidate) {
        return candidate.dataset.href === link.getAttribute('href');
      });
      var spotLeft = spot ? parseFloat(spot.style.left) : 50;
      var spotTop = spot ? parseFloat(spot.style.top) : 50;
      var spotWidth = spot ? parseFloat(spot.style.width) : 0;
      var spotHeight = spot ? parseFloat(spot.style.height) : 0;
      var mapX = spotLeft + spotWidth / 2;
      var mapY = spotTop + spotHeight / 2;
      link.parentElement.style.setProperty('--map-x', mapX + '%');
      link.parentElement.style.setProperty('--map-y', mapY + '%');
      if (spot) spot.dataset.num = String(index + 1).padStart(2, '0');
      return {
        link: link,
        spot: spot,
        name: link.textContent.trim(),
        address: link.parentElement.querySelector('.building-address').textContent.trim(),
        description: link.parentElement.querySelector('p').textContent,
        mapX: mapX,
        mapY: mapY
      };
    });
    var hovered = null, focused = null, opened = null, trigger = null;
    function paint() {
      var current = opened || hovered || focused;
      entries.forEach(function (entry) {
        entry.link.classList.toggle('is-highlighted', entry === current);
        if (entry.spot) entry.spot.classList.toggle('is-highlighted', entry === current);
      });
      caption.textContent = current ? current.name : 'Choose a building on the map or in the list.';
    }
    function revealRow(entry) {
      var row = entry.link.parentElement.getBoundingClientRect();
      var bounds = list.getBoundingClientRect();
      if (row.top < bounds.top) list.scrollTop += row.top - bounds.top;
      else if (row.bottom > bounds.bottom) list.scrollTop += row.bottom - bounds.bottom;
    }
    function open(entry, button) {
      opened = entry; trigger = button;
      title.textContent = entry.name;
      address.textContent = entry.address;
      description.textContent = entry.description;
      detailImage.style.setProperty('--map-x', entry.mapX + '%');
      detailImage.style.setProperty('--map-y', entry.mapY + '%');
      go.href = entry.link.getAttribute('href');
      go.setAttribute('aria-label', 'Go to ' + entry.name);
      [entry.link, entry.spot].filter(Boolean).forEach(function (node) { node.setAttribute('aria-expanded', 'true'); });
      paint();
      dialog.showModal();
      close.focus();
    }
    entries.forEach(function (entry) {
      [entry.link, entry.spot].filter(Boolean).forEach(function (node) {
        node.setAttribute('aria-haspopup', 'dialog');
        node.setAttribute('aria-controls', 'town-building-dialog');
        node.setAttribute('aria-expanded', 'false');
        node.addEventListener('mouseenter', function () {
          hovered = entry; if (node === entry.spot) revealRow(entry); paint();
        });
        node.addEventListener('mouseleave', function () { hovered = null; paint(); });
        node.addEventListener('focus', function () {
          focused = entry; if (node === entry.spot) revealRow(entry); paint();
        });
        node.addEventListener('blur', function () { focused = null; paint(); });
        node.addEventListener('click', function (event) {
          if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          open(entry, node);
        });
      });
      // Treat the illustrated directory row as the same destination. Touch
      // clicks can land on the row when press/release cross child elements.
      entry.link.closest('li').addEventListener('click', function (event) {
        if (entry.link.contains(event.target) || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        entry.link.click();
      });
    });
    close.addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('cancel', function (event) { event.preventDefault(); dialog.close(); });
    dialog.addEventListener('click', function (event) {
      if (event.target !== dialog) return;
      var rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right ||
          event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
    dialog.addEventListener('close', function () {
      if (opened) [opened.link, opened.spot].filter(Boolean).forEach(function (node) {
        node.setAttribute('aria-expanded', 'false');
      });
      var returnTo = trigger;
      opened = null; trigger = null; hovered = null;
      if (returnTo) returnTo.focus();
      paint();
    });
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
    if (readBtn) { readBtn.href = '/issues/issue-04.html'; readBtn.textContent = 'Read Episode 04'; }
    if (listenBtn) { listenBtn.href = '/watch.html?ep=04'; listenBtn.textContent = 'Listen to Episode 04'; }
  })();

  /* ---------- signed-in Resident continuation ---------- */
  window.svShowResume = function (epTitle, href) {
    var d = document.querySelector('.fc-default'), r = document.querySelector('.fc-resume');
    if (!d || !r) return;
    r.querySelector('.fc-resume-title').textContent = epTitle;
    if (href) r.querySelector('.fc-resume-link').href = href;
    d.hidden = true; r.hidden = false;
    var quickResume = document.querySelector('[data-switchboard-resume]');
    if (quickResume) {
      quickResume.href = href || '#this-week';
      quickResume.hidden = false;
      if (!quickResume.classList.contains('town-switchboard-resume')) quickResume.textContent = 'Continue';
    }
    var intentEpisode = document.querySelector('[data-intent-episode]');
    if (intentEpisode) {
      intentEpisode.href = href || '#this-week';
      var intentTitle = intentEpisode.querySelector('[data-intent-episode-title]');
      var intentSummary = intentEpisode.querySelector('[data-intent-episode-summary]');
      if (intentTitle) intentTitle.textContent = 'Continue where you left off';
      if (intentSummary) intentSummary.textContent = epTitle;
    }
  };

  (function () {
    var TITLES = {
      '01': 'Episode 01 · On Wednesdays We Do AI',
      '02': 'Episode 02 · Tell Me What You Want',
      '03': 'Episode 03 · The Burn Book Problem',
      '04': 'Episode 04 · The Founding Mothers'
    };
    var tried = false;
    function newestReleasedEpisode(document) {
      var episodes = document && document.episodes || {};
      return Object.keys(TITLES).map(function (key) {
        return { key: key, entry: episodes[key] };
      }).filter(function (item) {
        return item.entry && item.entry.value && Number.isFinite(Date.parse(item.entry.updated_at || ''));
      }).sort(function (a, b) {
        return Date.parse(b.entry.updated_at) - Date.parse(a.entry.updated_at);
      })[0] || null;
    }
    async function restore() {
      if (tried || !window.LAIDIESResidentAccountRuntime || !window.LAIDIESResidentContinuationV1) return;
      tried = true;
      try {
        var runtime = await window.LAIDIESResidentAccountRuntime.get();
        var session = await runtime.controller.getSession();
        if (!session) return;
        var result = await window.LAIDIESResidentContinuationV1.syncWith(runtime);
        if (!result || result.state !== 'account-backed') return;
        var episode = newestReleasedEpisode(result.document);
        if (!episode) return;
        var value = episode.entry.value || {};
        var href = value.completed === true
          ? '/issues/issue-' + episode.key + '.html'
          : '/watch.html?ep=' + episode.key;
        window.svShowResume(TITLES[episode.key], href);
      } catch (_) {
        /* The released Episode 04 panel remains the honest public fallback. */
      }
    }
    window.addEventListener('laidies:continuation-ready', restore, { once: true });
    if (window.LAIDIESResidentContinuationV1) restore();
  })();
})();

/* ---------- current NewsStand entry in the single intent chooser ---------- */
(function () {
  'use strict';
  var card = document.querySelector('[data-intent-news]');
  if (!card) return;
  function safeItem(item, requireCurrent) {
    return item && item.status === 'published' && (!requireCurrent || item.current === true) &&
      typeof item.headline === 'string' && item.headline.trim() &&
      typeof item.summary === 'string' && /^\/newsstand(?:\.html)?#[-a-z0-9]+$/i.test(item.url || '') &&
      Number.isFinite(Date.parse(item.publishedAt || ''));
  }
  function short(text, limit) {
    var value = String(text || '').replace(/\s+/g, ' ').trim();
    if (value.length <= limit) return value;
    return value.slice(0, limit).replace(/\s+\S*$/, '') + '…';
  }
  var feedUrl = /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname)
    ? 'https://laidies.ai/content/newsstand-public-feed.json'
    : '/content/newsstand-public-feed.json';
  fetch(feedUrl, { cache: 'no-store' }).then(function (response) {
    if (!response.ok) throw new Error('feed-unavailable');
    return response.json();
  }).then(function (feed) {
    if (!feed || feed.schemaVersion !== 'newsstand-public-feed-v1') throw new Error('feed-invalid');
    var current = feed.state === 'current' && Number.isFinite(Date.parse(feed.expiresAt || '')) && Date.parse(feed.expiresAt) >= Date.now();
    var items = (current ? feed.current : feed.archive || []).filter(function (item) { return safeItem(item, current); });
    if (!items.length) return;
    var item = items[0];
    card.href = item.url;
    card.querySelector('[data-intent-news-title]').textContent = current
      ? 'I want today\u2019s headline explained'
      : 'I want a headline explained';
    card.querySelector('[data-intent-news-summary]').textContent = short(item.headline, 118);
  }).catch(function () {
    /* The generic NewsStand door remains truthful and useful. */
  });
})();

/* ---------- current NewsStand preview ---------- */
(function () {
  'use strict';
  var root = document.querySelector('[data-sunny-now]');
  if (!root) return;
  var editionNames = {
    daily: 'The Daily', weekly: 'The Weekly', breaking: 'The Breaking',
    'big-picture': 'The Big Picture', opinion: 'The Opinion'
  };
  function safeItem(item, requireCurrent) {
    return item && item.status === 'published' && (!requireCurrent || item.current === true) &&
      typeof item.headline === 'string' && item.headline.trim() &&
      typeof item.summary === 'string' && /^\/newsstand(?:\.html)?#[-a-z0-9]+$/i.test(item.url || '') &&
      Number.isFinite(Date.parse(item.publishedAt || ''));
  }
  function short(text, limit) {
    var value = String(text || '').replace(/\s+/g, ' ').trim();
    if (value.length <= limit) return value;
    return value.slice(0, limit).replace(/\s+\S*$/, '') + '…';
  }
  function edition(item) {
    return item.id && item.id.indexOf('front-paige-') === 0
      ? 'Front PAiGE'
      : (editionNames[item.edition] || 'NewsStand');
  }
  function dateLabel(value) {
    try { return new Intl.DateTimeFormat('en-CA', { month: 'long', day: 'numeric' }).format(new Date(value)); }
    catch (_) { return ''; }
  }
  function fillCard(card, item, withTime) {
    if (!card || !item) return;
    card.href = item.url;
    var ed = card.querySelector('.sunny-now-edition');
    var title = card.querySelector('h3');
    var summary = card.querySelector('p');
    var time = card.querySelector('time');
    if (ed) ed.textContent = edition(item);
    if (title) title.textContent = item.headline;
    if (summary) summary.textContent = short(item.summary, withTime ? 220 : 150);
    if (time) { time.dateTime = item.publishedAt; time.textContent = dateLabel(item.publishedAt); }
  }
  var feedUrl = /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname)
    ? 'https://laidies.ai/content/newsstand-public-feed.json'
    : '/content/newsstand-public-feed.json';
  fetch(feedUrl, { cache: 'no-store' }).then(function (response) {
    if (!response.ok) throw new Error('feed-unavailable');
    return response.json();
  }).then(function (feed) {
    if (!feed || feed.schemaVersion !== 'newsstand-public-feed-v1') throw new Error('feed-invalid');
    var current = feed.state === 'current' && Number.isFinite(Date.parse(feed.expiresAt || '')) && Date.parse(feed.expiresAt) >= Date.now();
    var items = (current ? feed.current : feed.archive || []).filter(function (item) { return safeItem(item, current); });
    if (!items.length) throw new Error('feed-empty');
    fillCard(root.querySelector('[data-now-lead]'), items[0], true);
    var paige = items.find(function (item) { return item.id && item.id.indexOf('front-paige-') === 0; });
    var secondary = items.filter(function (item) { return item !== items[0] && item !== paige; });
    root.querySelectorAll('[data-now-secondary]').forEach(function (card, index) {
      if (secondary[index]) fillCard(card, secondary[index], false);
      else card.hidden = true;
    });
    var useful = root.querySelector('[data-now-useful]');
    if (paige) fillCard(useful, paige, false); else if (useful) useful.hidden = true;
    var kicker = root.querySelector('[data-now-kicker]');
    var heading = root.querySelector('[data-now-heading]');
    var status = root.querySelector('[data-now-status]');
    if (!current) {
      if (kicker) kicker.textContent = 'From the NewsStand archive';
      if (heading) heading.textContent = 'What\u2019s worth reading in SUNNYVAiLE?';
      if (status) status.textContent = 'The current edition is between press runs. You can still read the archive.';
    } else if (status) {
      if (kicker) kicker.textContent = 'Fresh from the NewsStand';
      if (heading) heading.textContent = 'What\u2019s happening in SUNNYVAiLE right now?';
      status.textContent = 'Updated ' + dateLabel(feed.generatedAt) + '.';
    }
  }).catch(function () {
    var status = root.querySelector('[data-now-status]');
    if (status) status.textContent = 'The presses are quiet. Browse the archive at the NewsStand.';
  });
})();

/* ---------- compact quick switchboard after the masthead ---------- */
(function () {
  'use strict';
  var board = document.querySelector('[data-sunny-switchboard]');
  var hero = document.querySelector('.hero');
  var now = document.querySelector('[data-sunny-now]');
  var footer = document.querySelector('body > footer');
  if (!board || !hero || !('IntersectionObserver' in window)) return;
  var heroVisible = true, nowVisible = false, footerVisible = false;
  function paint() {
    var menu = document.querySelector('.menu');
    var menuOpen = menu && menu.getAttribute('aria-expanded') === 'true';
    board.hidden = heroVisible || nowVisible || footerVisible || menuOpen || !!document.querySelector('dialog[open]');
  }
  new IntersectionObserver(function (entries) { heroVisible = entries[0].isIntersecting; paint(); }, { threshold: 0.08 }).observe(hero);
  if (now) new IntersectionObserver(function (entries) { nowVisible = entries[0].isIntersecting; paint(); }, { threshold: 0.05 }).observe(now);
  if (footer) new IntersectionObserver(function (entries) { footerVisible = entries[0].isIntersecting; paint(); }, { threshold: 0 }).observe(footer);
  document.addEventListener('click', function () { window.setTimeout(paint, 0); });
})();

/* ---------- compact rotating discovery strip ---------- */
(function () {
  'use strict';
  var root = document.querySelector('[data-dyk]');
  if (!root) return;

  var slides = Array.prototype.slice.call(root.querySelectorAll('[data-dyk-slide]'));
  var dots = Array.prototype.slice.call(root.querySelectorAll('[data-dyk-dot]'));
  var previous = root.querySelector('[data-dyk-prev]');
  var next = root.querySelector('[data-dyk-next]');
  var status = root.querySelector('[data-dyk-status]');
  if (!slides.length || !previous || !next) return;

  var index = 0;
  var timer = 0;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function labelFor(slide) {
    var heading = slide.querySelector('h3');
    return heading ? heading.textContent.trim() : 'feature';
  }

  function show(target, announce) {
    index = (target + slides.length) % slides.length;
    slides.forEach(function (slide, slideIndex) {
      slide.hidden = slideIndex !== index;
      slide.classList.toggle('is-active', slideIndex === index);
    });
    dots.forEach(function (dot, dotIndex) {
      dot.setAttribute('aria-pressed', dotIndex === index ? 'true' : 'false');
    });
    if (status && announce) {
      status.textContent = 'Feature ' + (index + 1) + ' of ' + slides.length + ': ' + labelFor(slides[index]);
    }
  }

  function stop() {
    if (timer) {
      window.clearInterval(timer);
      timer = 0;
    }
  }

  function start() {
    stop();
    if (!reduced && !document.hidden) {
      timer = window.setInterval(function () { show(index + 1, false); }, 8000);
    }
  }

  previous.addEventListener('click', function () { show(index - 1, true); start(); });
  next.addEventListener('click', function () { show(index + 1, true); start(); });
  dots.forEach(function (dot) {
    dot.addEventListener('click', function () {
      show(Number(dot.dataset.dykDot) || 0, true);
      start();
    });
  });
  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', start);
  root.addEventListener('focusin', stop);
  root.addEventListener('focusout', function (event) {
    if (!root.contains(event.relatedTarget)) start();
  });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop();
    else start();
  });

  show(0, false);
  start();
})();
