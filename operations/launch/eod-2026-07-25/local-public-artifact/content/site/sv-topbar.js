/**
 * Behaviour for the current LAiDIES homepage-style topbar on inner pages:
 * mobile navigation and the live wordmark's cycling i-tittle.
 */
(function () {
  'use strict';

  var menu = document.querySelector('.topbar__menu');
  var mobile = document.querySelector('#mobile-nav');

  function closeMenu() {
    if (!menu || !mobile) return;
    menu.setAttribute('aria-expanded', 'false');
    mobile.hidden = true;
  }

  if (menu && mobile) {
    menu.addEventListener('click', function () {
      var willOpen = menu.getAttribute('aria-expanded') !== 'true';
      menu.setAttribute('aria-expanded', String(willOpen));
      mobile.hidden = !willOpen;
    });

    mobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', function (event) {
      if (!mobile.hidden && !mobile.contains(event.target) && !menu.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !mobile.hidden) {
        closeMenu();
        menu.focus();
      }
    });
  }

  var tittles = [].slice.call(document.querySelectorAll('.topbar .logo-tit'));
  if (!tittles.length) return;

  var palette = ['#e982ab', '#57b6c0', '#f4a636', '#b3abe7', '#ec7a78', '#8bbde9'];
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    tittles.forEach(function (tittle) { tittle.style.color = palette[0]; });
    return;
  }

  function frame(now) {
    var index = Math.floor((now / 1000) / 1.8) % palette.length;
    tittles.forEach(function (tittle) { tittle.style.color = palette[index]; });
    window.requestAnimationFrame(frame);
  }

  window.requestAnimationFrame(frame);
})();
