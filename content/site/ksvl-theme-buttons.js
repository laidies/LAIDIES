/* Related-song controls use the existing KSVL deck and admitted catalogue. */
(function () {
  'use strict';
  var buttons = Array.from(document.querySelectorAll('button[data-ksvl-track]'));
  if (!buttons.length) return;
  var invoker = null;
  var cancelFocus = function () {};

  function focusDeck(button) {
    cancelFocus();
    var observer;
    var timer;
    cancelFocus = function () {
      if (observer) observer.disconnect();
      window.clearTimeout(timer);
    };
    function attempt() {
      var deck = document.querySelector('.ksvl-now-playing.is-visible');
      if (!deck) return;
      var retry = deck.querySelector('.ksvl-np-retry:not([hidden])');
      var control = retry || deck.querySelector('.ksvl-np-btn--play');
      if (!control) return;
      // Ownership is asynchronous. Wait for the actual deck, but do not pull
      // focus away if the reader has already moved to another page control.
      if (document.activeElement === button || document.activeElement === document.body ||
          deck.contains(document.activeElement)) control.focus({preventScroll: true});
      cancelFocus();
    }
    observer = new MutationObserver(attempt);
    observer.observe(document.body, {childList:true, subtree:true, attributes:true, attributeFilter:['class']});
    timer = window.setTimeout(cancelFocus, 5000);
    attempt();
  }

  function message(button, text) {
    var status = document.getElementById(button.getAttribute('aria-describedby'));
    if (status) status.textContent = text;
  }
  function unavailable() {
    buttons.forEach(function (button) {
      button.disabled = true;
      message(button, 'The theme player is unavailable. Please try again later.');
    });
  }
  if (typeof window.KSVL_whenReady !== 'function' ||
      typeof window.KSVL_playTrackById !== 'function') {
    unavailable();
    return;
  }

  buttons.forEach(function (button) {
    button.disabled = true;
    message(button, 'Checking song availability…');
    button.addEventListener('click', function () {
      if (button.disabled) return;
      invoker = button;
      // Keep this call inside the explicit click, after catalogue readiness.
      var accepted = window.KSVL_playTrackById(button.getAttribute('data-ksvl-track'));
      if (!accepted) {
        message(button, 'This theme cannot start right now. Please try again later.');
        return;
      }
      message(button, '');
      focusDeck(button);
    });
  });

  window.KSVL_whenReady().then(function (catalogue) {
    if (!catalogue || !catalogue.ready || !Array.isArray(catalogue.tracks)) {
      unavailable();
      return;
    }
    buttons.forEach(function (button) {
      var admitted = catalogue.tracks.some(function (track) {
        return track.id === button.getAttribute('data-ksvl-track');
      });
      button.disabled = !admitted;
      message(button, admitted ? '' : 'This theme is unavailable. Please try again later.');
    });
  }).catch(unavailable);

  document.addEventListener('click', function (event) {
    if (!invoker || !event.target.closest('.ksvl-np-btn--stop')) return;
    var returnTo = invoker;
    window.requestAnimationFrame(function () {
      if (returnTo.isConnected && !returnTo.disabled) returnTo.focus({preventScroll: true});
    });
  }, true);
})();
