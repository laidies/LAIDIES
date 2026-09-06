/* Reuse the LUMINAiRY's admitted profiles; this is discovery, not a second bio bank. */
(function () {
  'use strict';
  var section = document.getElementById('ns-luminairy');
  if (!section) return;
  var grid = section.querySelector('.ns-luminairy__grid');
  var status = section.querySelector('[role="status"]');
  var first = {saints: 'sister-mary-clarence', mavens: 'hannah-fry', trailblazers: 'allie-k-miller'};
  var labels = {saints: 'PATRON SAiNT', mavens: 'MAiVEN', trailblazers: 'TRAiLBLAZER'};

  function text(tag, className, value) {
    var node = document.createElement(tag);
    node.className = className;
    node.textContent = value;
    return node;
  }
  function weekIndex() {
    var day = new Intl.DateTimeFormat('en-CA', {timeZone: 'America/Vancouver', year: 'numeric', month: '2-digit', day: '2-digit'}).format(new Date());
    return Math.max(0, Math.floor((Date.parse(day + 'T12:00:00Z') - Date.parse('2026-09-02T12:00:00Z')) / (7 * 86400000)));
  }
  function spotlightForWeek(profiles, week) {
    var wings = Object.keys(first);
    var wing = wings[week % wings.length];
    var roster = profiles[wing].filter(function (profile) { return !profile.antiSaint; });
    var start = roster.findIndex(function (profile) { return profile.id === first[wing]; });
    if (!roster.length) throw new Error('Featured roster unavailable');
    if (start < 0) start = 0;
    return {wing: wing, profile: roster[(start + Math.floor(week / wings.length)) % roster.length]};
  }
  function safeLink(link) {
    if (!link || !link.label) return null;
    try {
      var url = new URL(link.url, location.origin);
      return url.protocol === 'https:' ? url.href : null;
    } catch (_) { return null; }
  }
  function makeCard(wing, profile) {
    var card = document.createElement('article');
    card.className = 'ns-luminairy__profile ns-luminairy__profile--' + wing;
    card.dataset.profileId = profile.id;
    card.appendChild(text('p', 'ns-luminairy__wing', labels[wing]));
    var portrait = document.createElement('img');
    portrait.src = profile.image;
    portrait.alt = '';
    portrait.loading = 'lazy';
    portrait.width = 144;
    portrait.height = 176;
    card.appendChild(portrait);
    card.appendChild(text('h3', '', profile.name));
    card.appendChild(text('p', 'ns-luminairy__role', profile.role));
    if (profile.id === 'sister-mary-clarence') {
      // Ali's September 6 editorial direction: teaching through sisterhood.
      [
        'Sister Mary Clarence is about teaching, uplifting those around you and the importance of sisterhood. Help other women learn. Share your knowledge, work together and support one another.',
        'We do not need to compete against one another. A chorus is louder than a single voice. When one of us rises, we should be rising together.',
        'This is central to women shaping AI: understanding it gives us something useful to share, and community helps more of us take part. That is the idea behind the LAiDIES community: learning together and supporting one another.'
      ].forEach(function (paragraph) { card.appendChild(text('p', 'ns-luminairy__about', paragraph)); });
    } else card.appendChild(text('p', 'ns-luminairy__about', profile.about));
    var lesson = document.createElement('div');
    lesson.className = 'ns-luminairy__lesson';
    lesson.appendChild(text('h4', '', 'Take this with you'));
    lesson.appendChild(text('p', '', profile.id === 'sister-mary-clarence' ? 'Teach someone what you have learned, help her build confidence, and make room for her voice.' : profile.lesson));
    card.appendChild(lesson);
    var links = document.createElement('div');
    links.className = 'ns-luminairy__links';
    var profileLink = text('a', '', 'Her LUMINAiRY card →');
    profileLink.href = '/luminairy#' + encodeURIComponent(profile.id);
    profileLink.setAttribute('aria-label', profile.name + ': open her LUMINAiRY card');
    links.appendChild(profileLink);
    if (wing === 'saints' && profile.song && profile.songStatus !== 'deferred') {
      var button = text('button', '', 'Play her song');
      button.type = 'button';
      button.disabled = true;
      button.dataset.ksvlTrack = 'saint-' + profile.id;
      var songStatus = text('span', 'ns-luminairy__song-status', 'Checking song availability…');
      songStatus.id = 'ns-song-' + profile.id;
      songStatus.setAttribute('role', 'status');
      button.setAttribute('aria-describedby', songStatus.id);
      button.setAttribute('aria-label', 'Play ' + profile.name + '’s song');
      links.appendChild(button);
      links.appendChild(songStatus);
    } else {
      // Prefer an admitted programme/resource over a social profile when available.
      var destinations = (profile.links || []).filter(function (link) { return safeLink(link) && link.type !== 'follow'; });
      var destination = destinations.find(function (link) { return link.type === 'listen' || link.type === 'watch'; }) || destinations[0];
      if (destination) {
        var resource = text('a', '', destination.label + ' ↗');
        resource.href = safeLink(destination);
        links.appendChild(resource);
      }
    }
    card.appendChild(links);
    if (profile.freshness) card.appendChild(text('p', 'ns-luminairy__freshness', profile.freshness));
    return card;
  }
  async function load() {
    try {
      if (typeof window.LAIDIES_LUMINAIRY_CLAIM_GATE?.admit !== 'function') throw new Error('Profile admission unavailable');
      var response = await fetch('/content/luminairy-profiles.json', {credentials: 'same-origin', cache: 'no-store'});
      if (!response.ok) throw new Error('Profiles unavailable');
      var profiles = await window.LAIDIES_LUMINAIRY_CLAIM_GATE.admit(await response.json());
      var week = weekIndex();
      var fragment = document.createDocumentFragment();
      var spotlight = spotlightForWeek(profiles, week);
      fragment.appendChild(makeCard(spotlight.wing, spotlight.profile));
      grid.replaceChildren(fragment);
      grid.hidden = false;
      status.hidden = true;
      section.dataset.state = 'ready';
    } catch (_) {
      grid.replaceChildren();
      grid.hidden = true;
      status.hidden = false;
      status.textContent = 'We couldn’t open this week’s spotlight. You can try the LUMINAiRY below.';
      section.dataset.state = 'unavailable';
    }
  }
  load();
})();
