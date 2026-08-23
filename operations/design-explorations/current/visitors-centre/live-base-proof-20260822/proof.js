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
    actions.innerHTML = '<a href="#vc-proof-what">What is SUNNYVAiLE?</a><a href="#vc-proof-routes">Help me find my route</a>';
    welcome.appendChild(actions);

    var orientation = document.createElement('section');
    orientation.className = 'vc-proof-orientation';
    orientation.id = 'vc-proof-what';
    orientation.setAttribute('aria-labelledby', 'vc-proof-what-title');
    orientation.innerHTML = [
      '<div class="vc-proof-orientation-copy">',
        '<p class="vc-kicker">First things first</p>',
        '<h2 id="vc-proof-what-title">What is SUNNYVAiLE?</h2>',
        '<p class="vc-proof-big-copy">Your brain has been saving <em>Clueless</em>, Carrie Bradshaw, “Wannabe,” dial-up tones, butterfly clips and roll-on glitter for years. At LAiDIES, that is not useless trivia. It is a head start.</p>',
        '<p>Every lesson unfolds in SUNNYVAiLE—a fictional town tuned to the Rewind Era (1990–2010), where sequential stories, accurate pop-culture analogies, practical activities and original songs work together to make AI easier to understand, use and remember.</p>',
      '</div>',
      '<figure class="vc-proof-town-strip">',
        '<img src="/assets/sunnyvaile-streets/main-street-dusk.webp" alt="MAiN Street in SUNNYVAiLE at dusk">',
        '<figcaption>The Rewind Era shaped us. AI is shaping now. SUNNYVAiLE is where they meet.</figcaption>',
      '</figure>',
      '<div class="vc-proof-format-wall" aria-labelledby="vc-proof-format-title">',
        '<div class="vc-proof-format-heading"><p class="vc-kicker">One town · Different learning jobs</p><h3 id="vc-proof-format-title">Pick the format that fits what you need.</h3></div>',
        '<a href="/chick-flicks.html"><img src="/assets/sunnyvaile-interiors/episode-vhs-boxes/ep-01.webp" alt=""><b>Episodes</b><strong>Read or hear the episode</strong><span>The Chick Flicks · latest released episode, or start at Episode 1</span></a>',
        '<a href="/newsstand.html"><img src="/assets/town-characters/scenes/paige-scene.png" alt=""><b>News</b><strong>Check the NewsStand</strong><span>Current reporting when the evidence earns it; released archive otherwise</span></a>',
        '<a href="/library.html"><img src="/assets/building-interiors/delivery-20260722-library-interior-reroll-v1/library-interior-from-credits-dechromed-v4-no-baked-text.png" alt=""><b>Books</b><strong>Look something up</strong><span>Ask Miss Jeeves at the LIBRAiRY reference desk</span></a>',
        '<a href="/blend-snap.html"><img src="/assets/episodes/ep-01/pixel/ep01-title-card-comic-v2.png" alt=""><b>Activities</b><strong>See available Study Pack pieces</strong><span>Blend &amp; Snap · only components marked available</span></a>',
        '<a href="/radio.html"><img src="/assets/building-interiors/ksvl-booth.jpg" alt=""><b>Songs</b><strong>Listen to KSVL 99.9</strong><span>LAiDIES original songs</span></a>',
        '<a href="/sunnyvaile-high.html"><img src="/assets/sunnyvaile-streets/schoolhouse-road-morning.webp" alt=""><b>Classes</b><strong>Demonstrations and practice</strong><span>The written class previews are open; the class tapes are still in production.</span></a>',
      '</div>'
    ].join('');

    var routeSection = document.createElement('section');
    routeSection.className = 'vc-proof-routes';
    routeSection.id = 'vc-proof-routes';
    routeSection.setAttribute('aria-labelledby', 'vc-proof-routes-title');
    routeSection.innerHTML = [
      '<div class="vc-proof-route-heading"><p class="vc-kicker">Help me do something</p><h2 id="vc-proof-routes-title">What do you want to do?</h2></div>',
      '<nav class="vc-proof-route-board" aria-label="Choose a route by goal">',
        '<a href="/#this-week"><span>Follow the Wednesday route</span><b>Take the Wednesday tour</b><small>Released episodes, then the full eight-stop route through town</small></a>',
        '<a href="/library.html"><span>Understand something</span><b>Look something up</b><small>Ask Miss Jeeves at the LIBRAiRY reference desk</small></a>',
        '<a href="/games/fairy-godmother.html"><span>Get practical help</span><b>Fix a prompt or get guidance</b><small>Bring it to the FAiRY Godmother</small></a>',
        '<a href="/newsstand.html"><span>Understand current events</span><b>Check the NewsStand</b><small>Current reporting when the evidence earns it</small></a>',
        '<a href="/blend-snap.html"><span>Practise</span><b>See available Study Pack pieces</b><small>Only components marked available</small></a>',
        '<a href="/radio.html"><span>Listen</span><b>Listen to KSVL 99.9</b><small>LAiDIES original songs</small></a>',
        '<a href="/sorority-house.html"><span>Connect</span><b>Visit Delta LAi Nu</b><small>Girl Talk, room prompts and your Closet</small></a>',
        '<a href="#vc-proof-map"><span>Explore</span><b>Explore the town</b><small>Six streets, every destination, and what you do there</small></a>',
      '</nav>'
    ].join('');

    var mapSection = document.createElement('section');
    mapSection.className = 'vc-proof-map';
    mapSection.id = 'vc-proof-map';
    mapSection.setAttribute('aria-labelledby', 'vc-proof-map-title');
    mapSection.innerHTML = '<div class="vc-proof-map-intro"><p class="vc-kicker">Show me the town</p><h2 id="vc-proof-map-title">The SUNNYVAiLE town map.</h2></div><div class="vc-proof-map-frame"></div>';
    mapSection.querySelector('.vc-proof-map-frame').append(map, card);
    hub.insertBefore(orientation, hubHead);
    hub.insertBefore(routeSection, hubHead);
    hub.insertBefore(mapSection, hubHead);

    var held = document.querySelector('.vc-room-art-held');
    if (held) held.remove();
  });
}());
