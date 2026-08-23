(function () {
  var query = new URLSearchParams(window.location.search);
  if (!query.has('homepage-proof')) return;

  document.documentElement.classList.add('homepage-proof');

  var topbar = document.querySelector('.topbar');
  if (topbar) {
    var mobileLibrary = document.createElement('a');
    mobileLibrary.className = 'mobile-library-link';
    mobileLibrary.href = '/library.html';
    mobileLibrary.textContent = 'LIBRAiRY';
    topbar.insertBefore(mobileLibrary, topbar.querySelector('.menu'));
  }

  var method = document.querySelector('#method');
  var methodHead = method && method.querySelector('.explainer-head');
  if (method && methodHead) {
    var filmstrip = document.createElement('figure');
    filmstrip.className = 'method-filmstrip';
    filmstrip.setAttribute('aria-label', 'The five parts of the LAiDIES learning method');
    filmstrip.innerHTML = [
      '<div class="method-frame method-frame-story"><img src="/assets/sunnyvaile-buildings/y2k-v3/07-the-chick-flicks.webp" alt="The Chick Flicks in SUNNYVAiLE"><figcaption><b>1</b><span>Follow the plot</span></figcaption></div>',
      '<div class="method-frame method-frame-analogy"><img src="/assets/episodes/ep-01/pixel/ep01-scene-09-chers-closet.png" alt="Cher\'s computerised closet from Episode 1"><figcaption><b>2</b><span>Unlock the idea</span></figcaption></div>',
      '<div class="method-frame method-frame-practice"><img src="/assets/sunnyvaile-streets/schoolhouse-road-morning.webp" alt="Schoolhouse Road in SUNNYVAiLE"><figcaption><b>3</b><span>Make it click</span></figcaption></div>',
      '<div class="method-frame method-frame-music"><img src="/assets/building-interiors/ksvl-booth.jpg" alt="Inside the KSVL 99.9 radio booth"><figcaption><b>4</b><span>Make it stick</span></figcaption></div>',
      '<div class="method-frame method-frame-town"><img src="/assets/sunnyvaile-buildings/y2k-v3-rethink-20260715/web/10-delta-lai-nu-house-rethink-v1.jpg" alt="Delta LAi Nu in SUNNYVAiLE"><figcaption><b>5</b><span>Join the town</span></figcaption></div>'
    ].join('');
    methodHead.insertAdjacentElement('afterend', filmstrip);

    var heldDialup = method.querySelector('[data-home-held="dial-up"]');
    var heldAda = method.querySelector('[data-home-held="ada"]');
    if (heldDialup && heldDialup.parentElement) heldDialup.parentElement.remove();
    if (heldAda) heldAda.remove();

    var methodLeft = method.querySelector('.explainer-left');
    var methodCopy = method.querySelector('.explainer-copy');
    if (methodLeft && methodCopy) methodLeft.insertAdjacentElement('afterend', methodCopy);

    var stepsTitle = method.querySelector('.steps-title');
    var purpose = method.querySelector('.explainer-right');
    if (stepsTitle && purpose) purpose.insertAdjacentElement('afterend', stepsTitle);
  }

  var hero = document.querySelector('.hero');
  if (hero) {
    var replay = document.createElement('button');
    replay.className = 'ident-replay';
    replay.type = 'button';
    replay.textContent = 'Replay dial-up arrival';
    replay.setAttribute('aria-label', 'Replay the LAiDIES dial-up arrival');
    hero.appendChild(replay);
    replay.addEventListener('click', function () { showIdent(true); });
  }

  function showIdent(force) {
    if (!force && sessionStorage.getItem('laidies_home_ident_seen') === '1') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      sessionStorage.setItem('laidies_home_ident_seen', '1');
      return;
    }

    var overlay = document.createElement('div');
    overlay.className = 'arrival-ident';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', 'Entering SUNNYVAiLE');
    overlay.innerHTML = '<video muted autoplay playsinline preload="auto" aria-label="LAiDIES dial-up arrival animation"><source src="/operations/design-explorations/laidies-motion-ident-20260725/continuous-i-evergreen-six-clean-electric-v10.mp4" type="video/mp4"></video><div class="arrival-controls"><button class="arrival-pause" type="button">Pause arrival</button><button class="arrival-skip" type="button">Skip arrival</button></div>';
    document.body.appendChild(overlay);
    var video = overlay.querySelector('video');
    var pause = overlay.querySelector('.arrival-pause');
    var skip = overlay.querySelector('.arrival-skip');
    var close = function () {
      sessionStorage.setItem('laidies_home_ident_seen', '1');
      overlay.classList.add('arrival-ident-out');
      window.setTimeout(function () { overlay.remove(); }, 260);
    };
    pause.addEventListener('click', function () {
      if (video.paused) {
        var resumed = video.play();
        if (resumed && resumed.catch) resumed.catch(close);
        pause.textContent = 'Pause arrival';
      } else {
        video.pause();
        pause.textContent = 'Resume arrival';
      }
    });
    skip.addEventListener('click', close);
    video.addEventListener('ended', close);
    video.addEventListener('error', close);
    var start = video.play();
    if (start && start.catch) start.catch(close);
  }

  showIdent(query.has('replay-ident'));
})();
