/* Related-song controls use the existing KSVL deck and admitted catalogue. */
(function () {
  'use strict';
  var invoker = null;
  var cancelFocus = function () {};
  var catalogue = null;
  var availability = 'checking';
  var generatedStatusId = 0;

  function isTrackButton(button) {
    return !!button && button.tagName === 'BUTTON' && button.hasAttribute('data-ksvl-track');
  }
  function trackButtons(root) {
    var found = [];
    if (isTrackButton(root)) found.push(root);
    if (root && root.querySelectorAll) found = found.concat(Array.from(root.querySelectorAll('button[data-ksvl-track]')));
    return found;
  }
  function statusFor(button) {
    var id = button.getAttribute('aria-describedby');
    var status = id && document.getElementById(id);
    if (status) return status;
    id = 'ksvl-related-song-status-' + (++generatedStatusId);
    status = document.createElement('span');
    status.id = id;
    status.setAttribute('role', 'status');
    status.style.cssText = 'position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0;';
    button.insertAdjacentElement('afterend', status);
    button.setAttribute('aria-describedby', id);
    return status;
  }
  function message(button, text) { statusFor(button).textContent = text; }
  function configure(button) {
    if (!isTrackButton(button)) return;
    if (availability === 'unavailable') {
      button.disabled = true;
      message(button, 'The theme player is unavailable. Please try again later.');
      return;
    }
    if (availability !== 'ready') {
      button.disabled = true;
      message(button, 'Checking song availability…');
      return;
    }
    var admitted = catalogue.tracks.some(function (track) {
      return track.id === button.getAttribute('data-ksvl-track');
    });
    button.disabled = !admitted;
    message(button, admitted ? '' : 'This theme is unavailable. Please try again later.');
  }
  function configureAll(root) { trackButtons(root || document).forEach(configure); }
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
    // Defer the first attempt until the activating click/keyboard event has
    // finished, so the browser cannot restore focus to the source control.
    window.requestAnimationFrame(attempt);
  }
  function setUnavailable() {
    availability = 'unavailable';
    catalogue = null;
    configureAll();
  }

  // One document-level handler keeps dynamically inserted and reinserted
  // controls on the single admitted catalogue/deck without accumulating
  // listeners on individual buttons.
  document.addEventListener('click', function (event) {
    var button = event.target && event.target.closest && event.target.closest('button[data-ksvl-track]');
    if (!isTrackButton(button) || button.disabled) return;
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
  document.addEventListener('click', function (event) {
    if (!invoker || !event.target.closest || !event.target.closest('.ksvl-np-btn--stop')) return;
    var returnTo = invoker;
    window.requestAnimationFrame(function () {
      if (returnTo.isConnected && !returnTo.disabled) returnTo.focus({preventScroll: true});
    });
  }, true);

  new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.type === 'attributes') configure(mutation.target);
      else mutation.addedNodes.forEach(function (node) { configureAll(node); });
    });
  }).observe(document.documentElement, {childList:true, subtree:true, attributes:true, attributeFilter:['data-ksvl-track', 'aria-describedby']});

  if (typeof window.KSVL_whenReady !== 'function' ||
      typeof window.KSVL_playTrackById !== 'function') {
    setUnavailable();
    return;
  }
  configureAll();
  window.KSVL_whenReady().then(function (readyCatalogue) {
    if (!readyCatalogue || !readyCatalogue.ready || !Array.isArray(readyCatalogue.tracks)) {
      setUnavailable();
      return;
    }
    catalogue = readyCatalogue;
    availability = 'ready';
    configureAll();
  }).catch(setUnavailable);
})();
