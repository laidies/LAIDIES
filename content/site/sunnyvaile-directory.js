/**
 * SUNNYVAiLE Map + Directory Component
 *
 * Renders a numbered map + directory + preview cards.
 * Mount by adding <div id="sv-map-directory"></div> to any page,
 * then <script defer src="/content/site/sunnyvaile-directory.js"></script>
 *
 * When the map asset lands, drop the file at
 *   /assets/sunnyvaile-map.png (or .svg)
 * and update SV_MAP_ASSET below. Building coordinates in SV_BUILDINGS
 * position the number markers on top of the map.
 */
(function() {
  'use strict';

  var SV_MAP_ASSET = '/assets/sunnyvaile-town-map-locked.jpg?v=20260708';
  var SV_MAP_ASPECT = 1858 / 846; // ≈ 2.2:1 streetscape (locked map)

  // Building data — canon 2026-07-04: MAiN Street 1-10, then cross streets 11-17
  // (Civic Square · Schoolhouse Rd · Willow Ln · Wisteria Ln · Lantern Hill)
  // x/y are % coordinates for number placement over the map (0-100)
  // Coordinates are matched to sunnyvaile-town-map-v9-canon.png (canon street order).
  var SV_BUILDINGS = [
    { num:  1, id: 'visitors-centre',  name: "The Welcome Wagon Visitor's Centre", address: 'No. 1 MAiN',                  href: '/visitors-centre.html',        oneLiner: 'The front door. Start here.',                                mechanics: ['Town map + directory', 'Meet the buildings', 'New here? First stop.'],                     x: 7.0, y: 66.0 },
    { num:  2, id: 'newsstand',        name: 'The NewsStand',                      address: 'No. 2 MAiN',                  href: '/newsstand.html',               oneLiner: 'Hot gossip · what everyone is talking about.',              mechanics: ['This week\'s headlines', 'What the town is saying', 'Trending SUNNYVAiLE'],                x: 17.0, y: 68.0 },
    { num:  3, id: 'chick-flicks',     name: 'The Chick Flicks',                   address: 'No. 3 MAiN',                  href: '/chick-flicks.html',             oneLiner: 'Video rental. Every episode is an aisle.',                  mechanics: ['This week\'s rental', 'Full episode catalog', 'Return by Friday'],                          x: 28.0, y: 64.0 },
    { num:  4, id: 'blend-snap',       name: 'The Blend & Snap',                   address: 'No. 4 MAiN',                  href: '/blend-snap.html',             oneLiner: 'Coffee shop. Study pack lives here.',                       mechanics: ['Study Pack / trading cards', 'Bulletin Board (soon)', '3rd place · order your usual'],     x: 39.0, y: 66.0 },
    { num:  5, id: 'mme-claio',        name: "Mme CLAi-O's Shop",                  address: 'No. 5 MAiN',                  href: '/games/madame-claio.html',     oneLiner: 'Fortune teller. Pick a card. Get read.',                    mechanics: ['Daily tarot pull', '100-card deck', 'Read / Message / Move'],                              x: 49.0, y: 65.0 },
    { num:  6, id: 'maikeover',        name: 'MAiKEOVER on MAiN',               address: 'No. 6 MAiN',               href: '/maikeover.html',              oneLiner: 'Beauty parlor. Where your Residence Card gets made.',       mechanics: ['Design your card', 'Weekly check-in ritual', 'MAiKEOVER = sign-up'],                       x: 59.0, y: 65.0 },
    { num:  7, id: 'bronze-aige',      name: 'The BRONZE AiGE',                    address: 'No. 7 MAiN',                  href: '/bronze-aige.html',            oneLiner: 'Happy hour · house band · Main Character Spritz.',          mechanics: ['Cocktail-of-the-week', 'THE LAiDIES live', 'Wednesday sets'],                              x: 68.0, y: 65.0 },
    { num:  8, id: 'dream-phone',      name: 'The Phone Booth (Dream Phone)',      address: 'No. 8 MAiN · Outside The Mall',  href: '/games/dream-phone.html',      oneLiner: 'Glass phone booth. Call in. Get the answer.',               mechanics: ['Call in a question', '75 Y2K object bundle', 'Voices: Receipts / Bestie / Boundary / etc'], x: 75.0, y: 75.0 },
    { num:  9, id: 'mall',             name: 'The Mall',                           address: 'No. 9 MAiN',                  href: '/mall.html',                   oneLiner: '10 shops of 90s and Y2K reference + your avatar closet.',   mechanics: ['Object shops · Wear this →', 'Reference cards', 'Mall Directory search'],                   x: 83.0, y: 62.0 },
    { num: 10, id: 'ksvl-radio',       name: 'KSVL Community RAiDIO',              address: 'No. 10 MAiN',                href: '/radio.html',                  oneLiner: 'DJ SunnyV spins PATRON SAiNT sets + town anthem.',           mechanics: ['SAiNT themes on rotation', 'Weekly episode tracks', 'Song-of-the-week pick'],              x: 94.0, y: 66.0 },
    { num: 11, id: 'library',          name: 'The Town LIBRAiRY',                  address: 'Civic Square',                  href: '/library.html',                oneLiner: 'Look it up. Reference desk for everything.',                mechanics: ['Power Map', 'Chamber of Receipts', 'Ask the Book'],                                         x: 33.0, y: 40.0 },
    { num: 12, id: 'town-hall',        name: 'Town Hall',                          address: 'Civic Square',                 href: '/town-hall.html',              oneLiner: 'Mayor Deb\'s office. Founder\'s note. Civic records.',       mechanics: ['Deb\'s NOPE poster archive', 'Founder\'s note', 'Announcements + FAQ'],                     x: 22.0, y: 32.0 },
    { num: 13, id: 'post-office',      name: 'The SUNNYVAiLE Post Office',            address: 'Civic Square',                 href: '/post-office.html',            oneLiner: 'Wednesday Drop signup + sign-in station.',                  mechanics: ['Wednesday Drop newsletter', 'Sign in via magic link', 'Send-a-note gifts'],                x: 7.0, y: 38.0 },
    { num: 14, id: 'sunnyvaile-high',  name: 'SUNNYVAiLE High',                    address: 'Schoolhouse Road',            href: '/sunnyvaile-high.html',        oneLiner: 'Season 1 · 101 classes. Take the pop quiz.',                mechanics: ['7 courses (Vocab 101 → ChatGPT 101)', 'Pop Quiz here', 'Detention slips + Hall Pass'],     x: 50.0, y: 24.0 },
    { num: 15, id: 'fairy-godmother',  name: "The FAiRY Godmother's House",        address: 'Willow Lane',                 href: '/games/fairy-godmother.html',  oneLiner: 'Ask LAiDY lives here. She grants wishes.',                  mechanics: ['Ask LAiDY chatbot', '3 wishes per visit', 'Willow Lane witchery'],                          x: 57.0, y: 42.0 },
    { num: 16, id: 'sorority-house',   name: 'The Sorority House · Delta LAi Nu',  address: 'Wisteria Lane',               href: '/sorority-house.html',         oneLiner: 'Members-only. 10 rooms. Card required.',                    mechanics: ['Ask the Room · Wins · Burn Book', 'Dear LAiDIES · Girl Talk', 'Card required at door'],    x: 78.0, y: 38.0 },
    { num: 17, id: 'sanctuary',        name: 'The LUMINAiRY',                     address: 'Lantern Hill',              href: '/luminairy.html',              oneLiner: 'PATRON SAiNTS + The MAiVENS. Pay homage.',                   mechanics: ['8 PATRON SAiNTS', 'MAiVENS wing (curated)', '"Pledge Allegiance"'],                          x: 89.0, y: 16.0 }
  ];

  // Shared exports — sv-you-are-here.js (and future components) read these.
  window.SV_BUILDINGS = SV_BUILDINGS;
  window.SV_MAP_ASSET = SV_MAP_ASSET;

  // ---------- CSS ----------
  var STYLE = ''
    + '.sv-map-directory { display: flex; flex-direction: column; gap: 0; margin: 40px 0; position: relative; }'
    + '.sv-map-wrap { position: relative; background: var(--pearl, #f8eef2); border: 1px solid rgba(75,33,72,0.14); border-radius: 8px; overflow: hidden; aspect-ratio: 1858 / 846; max-width: 1100px; margin: 0 auto; width: 100%; }'
    + '.sv-map-img { width: 100%; height: 100%; object-fit: cover; display: block; }'
    + '.sv-map-placeholder { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; color: var(--plum-soft, #6b3a66); padding: 24px; background: repeating-linear-gradient(45deg, transparent 0 20px, rgba(155,63,95,0.05) 20px 40px); }'
    + '.sv-map-placeholder-icon { font-size: 42px; margin-bottom: 12px; opacity: 0.5; }'
    + '.sv-map-placeholder-title { font-size: 14px; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase; color: var(--rose, #9b3f5f); margin-bottom: 8px; }'
    + '.sv-map-placeholder-sub { font-size: 14px; color: var(--plum-soft, #6b3a66); font-style: italic; }'
    + '.sv-map-marker { position: absolute; transform: translate(-50%, -50%); width: 64px; height: 64px; border-radius: 50%; background: transparent; color: transparent; border: 2px solid transparent; cursor: pointer; transition: border-color 0.15s ease, background 0.15s ease, transform 0.15s ease; z-index: 2; font-family: inherit; font-weight: 700; font-size: 13px; padding: 0; }'
    + '.sv-map-marker:hover, .sv-map-marker:focus, .sv-map-marker.is-highlighted { border-color: var(--rose, #9b3f5f); background: rgba(155, 63, 95, 0.28); transform: translate(-50%, -50%) scale(1.18); z-index: 4; outline: none; box-shadow: 0 4px 12px rgba(75,33,72,0.24); }'
    + '.sv-directory-item.is-highlighted { background: var(--blush, #f9e6ee); box-shadow: inset 3px 0 0 var(--rose, #9b3f5f); }'
    + '.sv-hover-preview { position: absolute; top: 12px; left: 12px; max-width: 320px; background: var(--cream, #fffdfb); border: 1.5px solid var(--rose, #9b3f5f); border-radius: 10px; padding: 16px 18px; box-shadow: 0 12px 32px rgba(75,33,72,0.30); opacity: 0; pointer-events: none; transition: opacity 0.15s ease, transform 0.15s ease; z-index: 5; text-decoration: none; color: inherit; display: block; }'
    + '.sv-hover-preview.is-visible { opacity: 1; pointer-events: auto; }'
    + '.sv-hover-preview:hover { border-color: var(--gold, #c9a227); transform: translateY(-2px); box-shadow: 0 14px 36px rgba(75,33,72,0.36); }'
    + '.sv-hover-preview:hover .sv-hover-preview__cta { color: var(--plum-deep, #341446); }'
    + '.sv-hover-preview__eyebrow { font-size: 10px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: var(--rose, #9b3f5f); margin-bottom: 6px; }'
    + '.sv-hover-preview__title { font-family: "Playfair Display", Georgia, serif; font-size: 18px; margin: 0 0 6px; color: var(--plum-deep, #341446); font-weight: 700; line-height: 1.2; }'
    + '.sv-hover-preview__oneliner { font-size: 13px; color: var(--plum-soft, #6b3a66); margin: 0 0 10px; font-style: italic; line-height: 1.45; }'
    + '.sv-hover-preview__mech { list-style: none; padding: 0; margin: 0 0 10px; font-size: 12px; color: var(--plum, #4b2148); line-height: 1.5; }'
    + '.sv-hover-preview__mech li::before { content: "★ "; color: var(--rose, #9b3f5f); }'
    + '.sv-hover-preview__cta { display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: var(--rose, #9b3f5f); }'
    + '.sv-directory { max-width: 1050px; margin: 20px auto 0; width: 92%; position: relative; z-index: 2; padding: 22px 26px 26px; background: rgba(255,253,251,0.90); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); border-radius: 14px; border: 1.5px solid rgba(155,63,95,0.22); box-shadow: 0 12px 32px rgba(75,33,72,0.20); overflow: hidden; box-sizing: border-box; }'
    + '@media (max-width: 700px) { .sv-directory { margin-top: 16px; width: 100%; background: transparent; backdrop-filter: none; -webkit-backdrop-filter: none; border: none; box-shadow: none; padding: 0; } }'
    + '.sv-directory-title { font-size: 11px; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase; color: var(--rose, #9b3f5f); margin: 0 0 6px; }'
    + '.sv-directory-note { font-size: 12px; color: var(--plum-soft, #6b3a66); margin: 0 0 18px; font-style: italic; }'
    + '.sv-directory-list { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); grid-template-rows: repeat(6, auto); grid-auto-flow: column; column-gap: 16px; border-top: 1px solid rgba(75,33,72,0.10); }'
    + '@media (max-width: 900px) { .sv-directory-list { grid-template-columns: repeat(2, minmax(0, 1fr)); grid-template-rows: repeat(9, auto); } }'
    + '@media (max-width: 560px) { .sv-directory-list { grid-template-columns: minmax(0, 1fr); grid-template-rows: auto; grid-auto-flow: row; } }'
    + '.sv-directory-item { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border-bottom: 1px solid rgba(75,33,72,0.10); cursor: pointer; text-align: left; background: transparent; border-left: none; border-right: none; border-top: none; width: 100%; transition: background 0.15s ease; font-family: inherit; color: inherit; height: 62px; box-sizing: border-box; }'
    + '.sv-directory-name { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }'
    + '.sv-directory-item:hover, .sv-directory-item:focus { background: var(--blush, #f9e6ee); outline: none; }'
    + '.sv-directory-num { flex-shrink: 0; width: 28px; height: 28px; border-radius: 50%; background: var(--pearl, #f8eef2); color: var(--plum, #4b2148); font-weight: 700; font-size: 12px; display: flex; align-items: center; justify-content: center; border: 1px solid rgba(75,33,72,0.14); }'
    + '.sv-directory-body { flex: 1; min-width: 0; }'
    + '.sv-directory-address { display: block; font-size: 10px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: var(--rose, #9b3f5f); }'
    + '.sv-directory-name { display: block; font-size: 14px; font-weight: 600; color: var(--plum, #4b2148); margin-top: 2px; }'
    + '.sv-directory-arrow { color: var(--plum-soft, #6b3a66); font-size: 14px; flex-shrink: 0; }'
    + '.sv-preview-backdrop { position: fixed; inset: 0; background: rgba(75,33,72,0.32); display: none; align-items: center; justify-content: center; z-index: 9998; padding: 20px; animation: sv-preview-fade 0.2s ease; }'
    + '.sv-preview-backdrop.is-open { display: flex; }'
    + '@keyframes sv-preview-fade { from { opacity: 0; } to { opacity: 1; } }'
    + '.sv-preview-card { background: var(--cream, #fffdfb); border: 1px solid rgba(75,33,72,0.14); border-radius: 12px; padding: 28px 28px 24px; max-width: 380px; width: 100%; box-shadow: 0 20px 60px rgba(75,33,72,0.30); position: relative; animation: sv-preview-pop 0.2s ease; }'
    + '@keyframes sv-preview-pop { from { transform: translateY(10px) scale(0.98); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }'
    + '.sv-preview-close { position: absolute; top: 12px; right: 12px; background: transparent; border: none; font-size: 22px; color: var(--plum-soft, #6b3a66); cursor: pointer; padding: 4px 8px; line-height: 1; }'
    + '.sv-preview-close:hover { color: var(--rose, #9b3f5f); }'
    + '.sv-preview-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: 0.28em; text-transform: uppercase; color: var(--rose, #9b3f5f); margin-bottom: 10px; }'
    + '.sv-preview-title { font-size: 22px; font-weight: 700; color: var(--plum, #4b2148); margin: 0 0 8px; letter-spacing: -0.014em; line-height: 1.2; }'
    + '.sv-preview-oneliner { font-size: 15px; color: var(--plum, #4b2148); margin: 0 0 18px; line-height: 1.45; font-style: italic; }'
    + '.sv-preview-heading { font-size: 10px; font-weight: 700; letter-spacing: 0.24em; text-transform: uppercase; color: var(--plum-soft, #6b3a66); margin: 0 0 8px; }'
    + '.sv-preview-mechanics { list-style: none; padding: 0; margin: 0 0 22px; }'
    + '.sv-preview-mechanics li { font-size: 13px; color: var(--plum, #4b2148); padding: 4px 0 4px 16px; position: relative; }'
    + '.sv-preview-mechanics li::before { content: "★"; position: absolute; left: 0; color: var(--gold, #c9a227); font-size: 10px; top: 6px; }'
    + '.sv-preview-cta { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; background: linear-gradient(135deg, var(--plum, #4b2148) 0%, var(--rose, #9b3f5f) 100%); color: var(--cream, #fffdfb); text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; transition: transform 0.15s ease; }'
    + '.sv-preview-cta:hover { transform: translateX(3px); }'
    + '.sv-preview-cta-arrow { font-size: 18px; }';

  function injectStyle() {
    if (document.getElementById('sv-map-directory-style')) return;
    var s = document.createElement('style');
    s.id = 'sv-map-directory-style';
    s.textContent = STYLE;
    document.head.appendChild(s);
  }

  // ---------- DOM builders ----------
  function el(tag, attrs, children) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function(k){
      if (k === 'class') e.className = attrs[k];
      else if (k === 'text') e.textContent = attrs[k];
      else if (k.slice(0,2) === 'on') e.addEventListener(k.slice(2), attrs[k]);
      else e.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function(c){ if (c) e.appendChild(c); });
    return e;
  }

  function buildMap() {
    var wrap = el('div', {class:'sv-map-wrap'});
    var img = new Image();
    img.className = 'sv-map-img';
    img.alt = 'SUNNYVAiLE town map';
    img.src = SV_MAP_ASSET;
    img.onload = function() { wrap.appendChild(img); };
    img.onerror = function() {
      var ph = el('div', {class:'sv-map-placeholder'}, [
        el('div', {class:'sv-map-placeholder-icon', text:'★'}),
        el('div', {class:'sv-map-placeholder-title', text:'SUNNYVAiLE Map'}),
        el('div', {class:'sv-map-placeholder-sub', text:'Landing shortly · directory below is live'})
      ]);
      wrap.appendChild(ph);
    };
    return wrap;
  }

  function addMarkers(wrap) {
    SV_BUILDINGS.forEach(function(b) {
      var m = el('button', {
        class: 'sv-map-marker',
        type: 'button',
        'data-building-id': b.id,
        'aria-label': b.num + '. ' + b.name,
        style: 'left:' + b.x + '%;top:' + b.y + '%;',
        onclick: function(){ window.location.href = b.href; },
        onmouseenter: function(){ showPreview(b); },
        onmouseleave: function(){ hidePreview(); },
        onfocus: function(){ showPreview(b); },
        onblur: function(){ hidePreview(); }
      });
      m.textContent = b.num;
      wrap.appendChild(m);
    });
  }

  function buildDirectory() {
    var wrap = el('div', {class:'sv-directory'});
    wrap.appendChild(el('div', {class:'sv-directory-title', text:'★ SUNNYVAiLE Directory'}));
    wrap.appendChild(el('div', {class:'sv-directory-note', text:'Hover a row for a preview. Click to step inside.'}));
    var list = el('ul', {class:'sv-directory-list'});
    SV_BUILDINGS.forEach(function(b) {
      var item = el('button', {
        class: 'sv-directory-item',
        type: 'button',
        'data-building-id': b.id,
        onclick: function(){ window.location.href = b.href; },
        onmouseenter: function(){ showPreview(b); },
        onmouseleave: function(){ scheduleHide(); },
        onfocus: function(){ showPreview(b); },
        onblur: function(){ scheduleHide(); }
      }, [
        el('span', {class:'sv-directory-num', text:String(b.num)}),
        el('span', {class:'sv-directory-body'}, [
          el('span', {class:'sv-directory-address', text:b.address}),
          el('span', {class:'sv-directory-name', text:b.name})
        ]),
        el('span', {class:'sv-directory-arrow', text:'→'})
      ]);
      var li = el('li'); li.appendChild(item); list.appendChild(li);
    });
    wrap.appendChild(list);
    return wrap;
  }

  // ---------- Hover preview card + delayed hide (so user can move mouse to the card) ----------
  var previewEl = null;
  var previewHref = null;
  var hideTimer = null;
  function ensurePreview() {
    if (previewEl) return previewEl;
    previewEl = el('a', {
      class: 'sv-hover-preview',
      href: '#',
      onmouseenter: function() { if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; } },
      onmouseleave: function() { scheduleHide(); }
    });
    var mapWrap = document.querySelector('.sv-map-wrap');
    if (mapWrap) mapWrap.appendChild(previewEl);
    return previewEl;
  }
  function showPreview(b) {
    if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; }
    var pc = ensurePreview();
    pc.setAttribute('href', b.href);
    previewHref = b.href;
    pc.innerHTML = '';
    pc.appendChild(el('div', {class:'sv-hover-preview__eyebrow', text:'★ ' + b.address}));
    pc.appendChild(el('h4', {class:'sv-hover-preview__title', text: b.name}));
    if (b.oneLiner) pc.appendChild(el('p', {class:'sv-hover-preview__oneliner', text: b.oneLiner}));
    var mech = (b.mechanics || []).slice(0, 3);
    if (mech.length) {
      var ul = el('ul', {class:'sv-hover-preview__mech'});
      mech.forEach(function(m){ ul.appendChild(el('li', {text: m})); });
      pc.appendChild(ul);
    }
    pc.appendChild(el('span', {class:'sv-hover-preview__cta', text: 'Click here to step inside →'}));
    pc.classList.add('is-visible');
    // Clear any existing highlights BEFORE adding new — prevents multi-row bleed
    // when the user moves quickly from one row to the next.
    document.querySelectorAll('.is-highlighted').forEach(function(e){
      e.classList.remove('is-highlighted');
    });
    document.querySelectorAll('[data-building-id="' + b.id + '"]').forEach(function(e){
      e.classList.add('is-highlighted');
    });
  }
  function scheduleHide() {
    if (hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(hidePreview, 250);
  }
  function hidePreview() {
    hideTimer = null;
    if (previewEl) previewEl.classList.remove('is-visible');
    document.querySelectorAll('.is-highlighted').forEach(function(e){
      e.classList.remove('is-highlighted');
    });
  }

  // ---------- Preview card ----------
  var backdrop = null;
  function ensureBackdrop() {
    if (backdrop) return backdrop;
    backdrop = el('div', {class:'sv-preview-backdrop', onclick: function(e){ if (e.target === backdrop) closePreview(); }});
    document.body.appendChild(backdrop);
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closePreview(); });
    return backdrop;
  }
  function openPreview(b) {
    var bd = ensureBackdrop();
    bd.innerHTML = '';
    var mech = el('ul', {class:'sv-preview-mechanics'});
    (b.mechanics || []).forEach(function(m){ mech.appendChild(el('li', {text:m})); });
    var cta = el('a', {class:'sv-preview-cta', href:b.href}, [
      el('span', {text: 'Enter ' + (b.name.length > 22 ? '→' : b.name.replace(/^The /,'') + ' →')}),
      el('span', {class:'sv-preview-cta-arrow', text:'→'})
    ]);
    // Simpler CTA text
    cta.innerHTML = '<span>Enter →</span><span class="sv-preview-cta-arrow" aria-hidden="true"></span>';
    var card = el('div', {class:'sv-preview-card'}, [
      el('button', {class:'sv-preview-close', 'aria-label':'Close', type:'button', onclick: closePreview, text:'×'}),
      el('div', {class:'sv-preview-eyebrow', text:'★ ' + b.address}),
      el('h3', {class:'sv-preview-title', text:b.name}),
      el('p', {class:'sv-preview-oneliner', text:b.oneLiner}),
      el('div', {class:'sv-preview-heading', text:'What lives here'}),
      mech,
      cta
    ]);
    bd.appendChild(card);
    bd.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function closePreview() {
    if (!backdrop) return;
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // ---------- Mount ----------
  function mount() {
    var mountEl = document.getElementById('sv-map-directory');
    if (!mountEl) return;
    injectStyle();
    var container = el('div', {class:'sv-map-directory'}, [buildMap(), buildDirectory()]);
    mountEl.innerHTML = '';
    mountEl.appendChild(container);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
