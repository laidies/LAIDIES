(function () {
  var query = new URLSearchParams(window.location.search);
  if (!query.has('homepage-proof')) return;

  document.documentElement.classList.add('homepage-proof');

  var topbar = document.querySelector('.topbar');
  if (topbar && !topbar.querySelector('.mobile-library-link')) {
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

  if (method) {
    var daily = document.createElement('section');
    daily.className = 'home-daily';
    daily.id = 'happening';
    daily.setAttribute('aria-labelledby', 'home-daily-title');
    daily.innerHTML = [
      '<div class="home-daily-scene home-daily-desktop">',
      '<img class="home-daily-art" src="/operations/design-explorations/current/homepage/live-base-proof-20260822/assets/homepage-newsstand-rack-daily-v1.png" alt="The Daily pulled forward from the four-paper SUNNYVAiLE NewsStand rack">',
      '<header class="home-daily-rail"><h2 id="home-daily-title">What is happening in <span>SUNNYVAiLE</span></h2></header>',
      '<p class="home-daily-global-state" data-home-daily-global>A clear day at the NewsStand. No qualified current paper is filed.</p>',
      '<article class="home-daily-paper home-daily-breaking"><h3>The Breaking</h3><p data-home-daily-job="breaking">News as it happens</p><p class="home-daily-state" data-home-daily-state="breaking"></p></article>',
      '<article class="home-daily-paper home-daily-weekly"><h3>The Weekly</h3><p data-home-daily-job="weekly">The week\'s bigger picture</p><p class="home-daily-state" data-home-daily-state="weekly"></p></article>',
      '<article class="home-daily-paper home-daily-tribune"><h3>The Tribune</h3><p data-home-daily-job="tribune">A sourced, visibly labelled argument</p><p class="home-daily-state" data-home-daily-state="tribune"></p></article>',
      '<header class="home-daily-head"><h3>The Daily</h3><p data-home-daily-job="daily">What changed and why it matters.</p></header>',
      '<div class="home-daily-content">',
      '<div class="home-daily-item"><strong>Paige\'s Practical AI Tip</strong><span data-home-daily-desk="paige_tip">Paige is checking today\'s tip against the receipts. No filler while she does.</span></div>',
      '<div class="home-daily-item"><strong>Career/Work-Life Tip</strong><span data-home-daily-desk="career_life">The useful move is being checked. No generic confidence advice has been substituted.</span></div>',
      '<div class="home-daily-item"><strong>Promptoscope</strong><span data-home-daily-desk="promptoscope">The Promptoscope is recalibrating. Mercury has not been blamed.</span></div>',
      '<div class="home-daily-actions"><a class="home-daily-action" href="/newsstand.html">Read the NewsStand</a><a class="home-daily-archive" href="/newsstand.html#ns-archive-title">Browse all back issues</a></div>',
      '</div></div>',
      '<div class="home-daily-mobile">',
      '<header class="home-daily-mobile-rail"><h2>What is happening in <span>SUNNYVAiLE</span></h2></header>',
      '<article class="home-daily-mobile-paper">',
      '<header class="home-daily-mobile-head"><h3>The Daily</h3><p data-home-daily-job="daily">What changed and why it matters.</p></header>',
      '<div class="home-daily-mobile-copy">',
      '<div class="home-daily-item"><strong>Paige\'s Practical AI Tip</strong><span data-home-daily-desk="paige_tip">Paige is checking today\'s tip against the receipts. No filler while she does.</span></div>',
      '<div class="home-daily-item"><strong>Career/Work-Life Tip</strong><span data-home-daily-desk="career_life">The useful move is being checked. No generic confidence advice has been substituted.</span></div>',
      '<div class="home-daily-item"><strong>Promptoscope</strong><span data-home-daily-desk="promptoscope">The Promptoscope is recalibrating. Mercury has not been blamed.</span></div>',
      '<div class="home-daily-actions"><a class="home-daily-action" href="/newsstand.html">Read the NewsStand</a><a class="home-daily-archive" href="/newsstand.html#ns-archive-title">Browse all back issues</a></div>',
      '</div></article>',
      '<p class="home-daily-mobile-state" data-home-daily-global>A clear day at the NewsStand. No qualified current paper is filed.</p>',
      '</div>'
    ].join('');
    method.insertAdjacentElement('afterend', daily);
    hydrateDaily();
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

  function loadDailySource(src) {
    return new Promise(function (resolve, reject) {
      var existing = document.querySelector('script[src="' + src + '"]');
      if (existing) {
        if (existing.dataset.homeDailyLoaded === '1') resolve();
        else existing.addEventListener('load', resolve, { once: true });
        return;
      }
      var script = document.createElement('script');
      script.src = src;
      script.dataset.homeDailyLoaded = '0';
      script.addEventListener('load', function () { script.dataset.homeDailyLoaded = '1'; resolve(); }, { once: true });
      script.addEventListener('error', reject, { once: true });
      document.head.appendChild(script);
    });
  }

  function hydrateDaily() {
    loadDailySource('/content/newsstand-reader-contract.js')
      .then(function () { return loadDailySource('/content/newsstand-stories.js'); })
      .then(function () {
        var data = window.NEWSSTAND_DATA;
        var contract = window.NewsstandContract;
        if (!data || !contract || contract.validate(data).length) return;
        var now = new Date().toISOString();
        var labels = { breaking: 'The Breaking', daily: 'The Daily', weekly: 'The Weekly', tribune: 'The Tribune' };
        var stateLabels = { quiet: 'No issue today', archive: 'Latest complete edition', stale: 'Check overdue · not current', hold: 'Not published yet', unavailable: 'Publication record unavailable' };
        Object.keys(data.publications).forEach(function (edition) {
          var publication = data.publications[edition];
          document.querySelectorAll('[data-home-daily-job="' + edition + '"]').forEach(function (node) { node.textContent = publication.job; });
          var state = contract.effectivePublicationState(publication, now);
          document.querySelectorAll('[data-home-daily-state="' + edition + '"]').forEach(function (node) { node.textContent = stateLabels[state] || (labels[edition] + ' is current'); });
          if (edition === 'breaking' && state !== 'current') {
            document.querySelectorAll('.home-daily-breaking').forEach(function (node) { node.hidden = true; });
          }
        });
        var current = contract.EDITIONS.filter(function (edition) {
          return contract.effectivePublicationState(data.publications[edition], now) === 'current';
        });
        var status = current.length
          ? current.map(function (edition) { return labels[edition]; }).join(' and ') + (current.length === 1 ? ' is current.' : ' are current.')
          : 'A clear day at the NewsStand. No qualified current paper is filed.';
        document.querySelectorAll('[data-home-daily-global]').forEach(function (node) { node.textContent = status; });
        return fetch('/content/newsstand-daily-issues.json');
      })
      .then(function (response) { return response && response.ok ? response.json() : null; })
      .then(function (dailyData) {
        if (!dailyData) return;
        var issue = (dailyData.issues || []).slice().sort(function (a, b) {
          return String(b.editionDate).localeCompare(String(a.editionDate));
        })[0];
        if (!issue) return;
        (issue.desks || []).forEach(function (desk) {
          if (!desk.emptyState) return;
          document.querySelectorAll('[data-home-daily-desk="' + desk.type + '"]').forEach(function (node) { node.textContent = desk.emptyState; });
        });
      })
      .catch(function () {});
  }

  showIdent(query.has('replay-ident'));
})();
