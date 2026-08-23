(function () {
  'use strict';

  var entrance = document.querySelector('[data-entrance]');
  var ident = document.querySelector('[data-ident]');
  var pause = document.querySelector('[data-pause]');
  var skip = document.querySelector('[data-skip]');
  var replay = document.querySelector('[data-replay]');
  var menu = document.querySelector('[data-menu]');
  var mobileNav = document.getElementById('mobile-nav');
  var key = 'laidies-home-ident-v10-seen';

  function reducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function finishEntrance() {
    if (!entrance || !ident) return;
    ident.pause();
    entrance.hidden = true;
    document.body.style.overflow = '';
    try { window.sessionStorage.setItem(key, '1'); } catch (_) {}
  }

  function startEntrance(force) {
    if (!entrance || !ident || reducedMotion()) return;
    var seen = false;
    try { seen = window.sessionStorage.getItem(key) === '1'; } catch (_) {}
    if (seen && !force) return;
    entrance.hidden = false;
    document.body.style.overflow = 'hidden';
    ident.currentTime = 0;
    ident.play().catch(finishEntrance);
  }

  if (ident) {
    ident.addEventListener('ended', finishEntrance);
    ident.addEventListener('error', finishEntrance);
  }
  if (skip) skip.addEventListener('click', finishEntrance);
  if (pause) pause.addEventListener('click', function () {
    if (!ident) return;
    if (ident.paused) {
      ident.play().catch(finishEntrance);
      pause.textContent = 'Pause entrance';
    } else {
      ident.pause();
      pause.textContent = 'Resume entrance';
    }
  });
  if (replay) replay.addEventListener('click', function () { startEntrance(true); });
  if (menu && mobileNav) menu.addEventListener('click', function () {
    var open = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', String(!open));
    mobileNav.hidden = open;
  });

  startEntrance(new URLSearchParams(window.location.search).get('entrance') === 'show');
}());
