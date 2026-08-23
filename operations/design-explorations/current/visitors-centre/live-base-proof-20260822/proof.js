(function () {
  'use strict';

  if (!document.documentElement.classList.contains('visitors-centre-proof')) return;

  document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('visitors-centre-proof');

    var room = document.querySelector('.vc-room');
    var welcome = document.querySelector('.vc-welcome');
    var map = document.getElementById('vc-map-stage');
    var card = document.getElementById('vc-building-card');
    var hub = document.querySelector('.vc-hub');
    var hubHead = document.querySelector('.vc-hub-head');
    if (!room || !welcome || !map || !card || !hub || !hubHead) return;

    var actions = document.createElement('nav');
    actions.className = 'vc-proof-arrival-actions';
    actions.setAttribute('aria-label', 'Visitor’s Centre arrival choices');
    actions.innerHTML = '<a href="#vc-proof-map">Show me the town</a><a href="#directory-title">Choose by name</a>';
    welcome.appendChild(actions);

    var mapSection = document.createElement('section');
    mapSection.className = 'vc-proof-map';
    mapSection.id = 'vc-proof-map';
    mapSection.setAttribute('aria-labelledby', 'vc-proof-map-title');
    mapSection.innerHTML = '<div class="vc-proof-map-intro"><p class="vc-kicker">Show me the town</p><h2 id="vc-proof-map-title">The SUNNYVAiLE town map.</h2></div><div class="vc-proof-map-frame"></div>';
    mapSection.querySelector('.vc-proof-map-frame').append(map, card);
    hub.insertBefore(mapSection, hubHead);

    var held = document.querySelector('.vc-room-art-held');
    if (held) held.remove();
  });
}());
