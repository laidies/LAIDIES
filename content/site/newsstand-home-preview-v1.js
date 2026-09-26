/* Current admitted Daily activity. No account or reading-history storage. */
(function () {
  'use strict';
  var host = document.querySelector('#today');
  if (!host || document.querySelector('[data-daily-activity-preview]')) return;
  function localDay() {
    return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Vancouver', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  }
  function valid(feed) {
    var activity = feed && feed.dailyActivity;
    return feed && feed.schemaVersion === 'newsstand-public-feed-v1' && feed.state === 'current' &&
      Date.parse(feed.expiresAt) >= Date.now() && Date.parse(feed.generatedAt) <= Date.now() &&
      activity && activity.status === 'published' && activity.editionDate === localDay() &&
      typeof activity.id === 'string' && /^[a-z0-9-]+$/i.test(activity.id) &&
      activity.url === '/newsstand?column=' + encodeURIComponent(activity.id) &&
      typeof activity.headline === 'string' && activity.headline.trim() &&
      typeof activity.text === 'string' && activity.text.trim() && activity.text.length <= 1600;
  }
  fetch('/content/newsstand-public-feed.json', { cache: 'no-store' }).then(function (response) {
    if (!response.ok) throw new Error('Daily unavailable');
    return response.json();
  }).then(function (feed) {
    if (!valid(feed)) return;
    var activity = feed.dailyActivity, box = document.createElement('aside');
    box.className = 'ns-home-activity'; box.setAttribute('data-daily-activity-preview', '');
    box.setAttribute('aria-labelledby', 'ns-home-activity-title');
    var label = document.createElement('p'); label.className = 'ns-home-activity__label'; label.textContent = 'Try this today';
    var heading = document.createElement('h3'); heading.id = 'ns-home-activity-title'; heading.textContent = activity.headline;
    var copy = document.createElement('p'); copy.className = 'ns-home-activity__copy'; copy.textContent = activity.text;
    var link = document.createElement('a'); link.href = activity.url; link.textContent = 'Open today’s activity →';
    box.append(label, heading, copy, link); host.appendChild(box);
    // A tab left open overnight must not keep calling yesterday's activity today.
    function expire() { if (!valid(feed)) { box.remove(); window.removeEventListener('focus', expire); clearInterval(timer); } }
    var timer = setInterval(expire, 60000); window.addEventListener('focus', expire);
  }).catch(function () { /* Existing learning and NewsStand doors remain available. */ });
})();
