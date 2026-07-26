/*!
 * Puffy-sticker bookmarks — mark sections in the Handbook, they land on the
 * Puffy Board in your Closet. Locked 2026-07-03; built 2026-07-12.
 * Storage: laidies_puffies_board = JSON array of
 *   { id, title, summary, url, sticker, placedAt }
 */
(function () {
  var KEY = 'laidies_puffies_board';
  var POUCH_KEY = 'laidies_puffy_sticker_pouch';
  /* The approved 75-piece collection. Do not replace with generic motifs. */
  var STICKERS = [
    'usable-25/01-heart-sunglasses.png','usable-25/02-flip-phone-charm.png',
    'usable-25/03-holographic-cd.png','usable-25/04-pink-boombox.png',
    'usable-25/05-pink-digital-camera.png','usable-25/06-retro-computer-heart.png',
    'usable-25/07-80s-baby.png','usable-25/08-as-if.png','usable-25/09-whatever.png',
    'usable-25/10-grl-pwr.png','usable-25/11-spice-up-your-life.png','usable-25/12-y2k.png',
    'usable-25/13-90s-rule.png','usable-25/14-no-fear.png','usable-25/15-laidies.png',
    'usable-25/16-girl-power-machine-power.png','usable-25/17-i-heart-ai.png',
    'usable-25/18-slaiyer.png','usable-25/19-queen-of-tabs.png',
    'usable-25/20-tab-collector.png','usable-25/21-prompt-queen.png',
    'usable-25/22-upload-the-glow.png','usable-25/23-glam-exe.png',
    'usable-25/24-beauty-and-brains.png','usable-25/25-ctrl-alt-slaiy.png',
    'usable-25-more/26-girl-power.png','usable-25-more/27-make-it-iconic.png',
    'usable-25-more/28-alt-girl.png','usable-25-more/29-cyber-sister.png',
    'usable-25-more/30-soft-power.png','usable-25-more/31-boss-mode.png',
    'usable-25-more/32-future-girl.png','usable-25-more/33-electric-girl.png',
    'usable-25-more/34-pixel-power.png','usable-25-more/35-modem-magic.png',
    'usable-25-more/36-dial-up-diva.png','usable-25-more/37-cache-queen.png',
    'usable-25-more/38-brain-trust.png','usable-25-more/39-main-character.png',
    'usable-25-more/40-hot-take.png','usable-25-more/41-pop-off.png',
    'usable-25-more/42-very-online.png','usable-25-more/43-access-granted.png',
    'usable-25-more/44-data-darling.png','usable-25-more/45-power-user.png',
    'usable-25-more/46-machine-queen.png','usable-25-more/47-code-like-a-girl.png',
    'usable-25-more/48-big-ideas.png','usable-25-more/49-glitter-brain.png',
    'usable-25-more/50-mind-over-machine.png',
    'usable-25-images/51-compact-makeup-palette.png',
    'usable-25-images/52-holographic-butterfly.png',
    'usable-25-images/53-pink-platform-boot.png',
    'usable-25-images/54-translucent-gem-ring.png',
    'usable-25-images/55-purple-pink-sparkle-star.png',
    'usable-25-images/56-clear-lip-gloss.png',
    'usable-25-images/57-pink-mini-mp3-player.png',
    'usable-25-images/58-pink-game-controller.png',
    'usable-25-images/59-silver-laptop-heart.png',
    'usable-25-images/60-teal-floppy-disk.png',
    'usable-25-images/61-pink-headphones.png',
    'usable-25-images/62-holographic-cursor-arrow.png',
    'usable-25-images/63-blue-purple-lava-lamp.png',
    'usable-25-images/64-black-pink-cassette.png',
    'usable-25-images/65-heart-locket-necklace.png',
    'usable-25-images/66-yellow-floral-roller-skate.png',
    'usable-25-images/67-pink-camcorder.png',
    'usable-25-images/68-transparent-cd-jewel-case.png',
    'usable-25-images/69-pink-digital-pet-keychain.png',
    'usable-25-images/70-pink-microphone.png',
    'usable-25-images/71-iridescent-butterfly-clip.png',
    'usable-25-images/72-pink-computer-mouse.png',
    'usable-25-images/73-stack-photo-prints.png',
    'usable-25-images/74-translucent-phone-charm-beads.png',
    'usable-25-images/75-pink-teal-magic-wand.png'
  ].map(function (file) {
    return {
      file: file,
      label: file.split('/').pop().replace(/^\d+-/, '').replace(/\.png$/, '').replace(/-/g, ' ')
    };
  });
  var DEFAULT_POUCH = [
    'usable-25/01-heart-sunglasses.png',
    'usable-25/02-flip-phone-charm.png',
    'usable-25/03-holographic-cd.png',
    'usable-25/04-pink-boombox.png',
    'usable-25/06-retro-computer-heart.png',
    'usable-25-images/52-holographic-butterfly.png',
    'usable-25-images/53-pink-platform-boot.png',
    'usable-25-images/54-translucent-gem-ring.png',
    'usable-25-images/55-purple-pink-sparkle-star.png',
    'usable-25-images/75-pink-teal-magic-wand.png'
  ];
  var activePicker = null;
  var storageFailed = false;
  var recoveryCount = 0;
  var MAX_BOARD_ITEMS = 100;
  var BOARD_FIELDS = ['id', 'placedAt', 'purpose', 'sticker', 'summary', 'title', 'url'];
  var PUFFY_PAGE_ROUTES = new Set([
    '/library.html',
    '/handbook.html',
    '/sunnyvaile-high.html',
    '/shop.html',
    '/mall/as-seen-on-tv.html',
    '/mall/books-and-records.html',
    '/mall/food-court.html',
    '/mall/gizmos-and-gadgets.html',
    '/mall/hanger-management.html',
    '/mall/last-summer.html',
    '/mall/maiybe.html',
    '/mall/mall-kiosk.html',
    '/mall/rollin-with-my-homies.html'
  ]);

  function reportStorageFailure() {
    storageFailed = true;
    document.documentElement.setAttribute('data-puffy-storage', 'failed');
    var notice = document.getElementById('puffyStorageStatus');
    if (!notice) {
      notice = document.createElement('p');
      notice.id = 'puffyStorageStatus';
      notice.setAttribute('role', 'alert');
      notice.style.cssText =
        'margin:12px 0;padding:10px 12px;border:2px solid #9b3f5f;background:#fff6f8;color:#421b2c;font:700 12px/1.45 Jost,sans-serif';
      notice.textContent =
        'This browser is not allowing device-local Puffy saves. Nothing was saved or removed. You can keep reading and try again after storage is available.';
      var board = document.getElementById('puffyBoard');
      var reader = document.getElementById('reader');
      if (board || reader) (board || reader).insertAdjacentElement('beforebegin', notice);
      else document.body.prepend(notice);
    }
  }

  function reportRecovery(count) {
    if (!count) return;
    recoveryCount += count;
    document.documentElement.setAttribute('data-puffy-recovered', String(recoveryCount));
    var notice = document.getElementById('puffyRecoveryStatus');
    if (!notice) {
      notice = document.createElement('p');
      notice.id = 'puffyRecoveryStatus';
      notice.setAttribute('role', 'status');
      notice.setAttribute('aria-live', 'polite');
      notice.style.cssText =
        'margin:12px 0;padding:10px 12px;border:2px solid #247b83;background:#f2fcfb;color:#163d42;font:700 12px/1.45 Jost,sans-serif';
      var board = document.getElementById('puffyBoard');
      var reader = document.getElementById('reader');
      if (board || reader) (board || reader).insertAdjacentElement('beforebegin', notice);
      else document.body.prepend(notice);
    }
    notice.textContent =
      'We removed ' + recoveryCount + ' damaged or unsafe device-local Puffy ' +
      (recoveryCount === 1 ? 'save' : 'saves') +
      '. Your other saved places are still here.';
  }

  function cleanText(value, max, required) {
    if (typeof value !== 'string' || /[\u0000-\u001f\u007f]/.test(value)) return null;
    var clean = value.trim();
    if ((required && !clean) || clean.length > max) return null;
    return clean;
  }

  function exactIsoDate(value) {
    if (typeof value !== 'string' ||
        !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)) return null;
    var milliseconds = Date.parse(value);
    if (!Number.isFinite(milliseconds) ||
        new Date(milliseconds).toISOString() !== value ||
        milliseconds > Date.now() + 60000) return null;
    return value;
  }

  function safeLocalRoute(value) {
    if (typeof value !== 'string' || value.length < 2 || value.length > 500 ||
        value[0] !== '/' || value.startsWith('//') ||
        /[\\\u0000-\u001f\u007f]/.test(value) ||
        /%(?:00|0a|0d|2f|5c)/i.test(value)) return null;
    var url;
    try { url = new URL(value, location.origin); }
    catch (error) { return null; }
    var rawPath = value.split(/[?#]/)[0];
    if (url.origin !== location.origin || url.pathname !== rawPath ||
        url.search || !PUFFY_PAGE_ROUTES.has(url.pathname)) return null;
    return url.pathname + url.hash;
  }

  function canonicalBoardRecord(record) {
    if (!record || typeof record !== 'object' || Array.isArray(record)) return null;
    var keys = Object.keys(record).sort();
    if (keys.some(function (key) { return !BOARD_FIELDS.includes(key); })) return null;
    var id = cleanText(record.id, 120, true);
    var title = cleanText(record.title, 120, true);
    var summary = cleanText(record.summary === undefined ? '' : record.summary, 300, false);
    var purpose = cleanText(record.purpose === undefined ? '' : record.purpose, 80, false);
    var url = safeLocalRoute(record.url);
    var placedAt = exactIsoDate(record.placedAt);
    if (!id || !/^[A-Za-z0-9][A-Za-z0-9._:-]{0,119}$/.test(id) ||
        title === null || summary === null || purpose === null || !url ||
        !placedAt || !stickerByFile(record.sticker)) return null;
    return {
      id: id,
      title: title,
      summary: summary,
      url: url,
      sticker: record.sticker,
      purpose: purpose,
      placedAt: placedAt
    };
  }

  function normalizeBoard(value) {
    if (!Array.isArray(value)) return { list: [], rejected: 1 };
    var list = [];
    var indexes = Object.create(null);
    var rejected = Math.max(0, value.length - 500);
    value.slice(0, 500).forEach(function (record) {
      var clean = canonicalBoardRecord(record);
      if (!clean) { rejected += 1; return; }
      if (indexes[clean.id] !== undefined) {
        rejected += 1;
        var at = indexes[clean.id];
        if (clean.placedAt > list[at].placedAt) list[at] = clean;
        return;
      }
      if (list.length >= MAX_BOARD_ITEMS) { rejected += 1; return; }
      indexes[clean.id] = list.length;
      list.push(clean);
    });
    return { list: list, rejected: rejected };
  }

  function writeBoard(list) {
    try {
      var serialized = JSON.stringify(list);
      localStorage.setItem(KEY, serialized);
      if (localStorage.getItem(KEY) !== serialized) throw new Error('Puffy save did not round-trip');
      return true;
    } catch (e) {
      reportStorageFailure();
      return false;
    }
  }

  function load() {
    var raw;
    var parsed;
    try {
      raw = localStorage.getItem(KEY);
      parsed = raw === null ? [] : JSON.parse(raw);
    } catch (e) {
      reportRecovery(1);
      writeBoard([]);
      return [];
    }
    var normalized = normalizeBoard(parsed);
    var serialized = JSON.stringify(normalized.list);
    if (normalized.rejected || raw !== null && raw !== serialized) {
      reportRecovery(normalized.rejected);
      writeBoard(normalized.list);
    }
    return normalized.list;
  }
  function save(list) {
    var normalized = normalizeBoard(list);
    if (normalized.rejected) {
      reportRecovery(normalized.rejected);
      return false;
    }
    return writeBoard(normalized.list);
  }
  function canonicalPouchRecord(item) {
    if (typeof item === 'string') item = { file: item, purpose: '' };
    if (!item || typeof item !== 'object' || Array.isArray(item) ||
        Object.keys(item).some(function (key) { return key !== 'file' && key !== 'purpose'; })) return null;
    var purpose = cleanText(item.purpose === undefined ? '' : item.purpose, 80, false);
    if (!stickerByFile(item.file) || purpose === null) return null;
    return { file: item.file, purpose: purpose };
  }
  function normalizePouch(value) {
    if (!Array.isArray(value)) return { list: [], rejected: 1 };
    var seen = new Set();
    var rejected = 0;
    var list = [];
    value.forEach(function (item) {
      var clean = canonicalPouchRecord(item);
      if (!clean || seen.has(clean.file) || list.length >= 10) {
        rejected += 1;
        return;
      }
      seen.add(clean.file);
      list.push(clean);
    });
    return { list: list, rejected: rejected };
  }
  function writePouch(list) {
    try {
      var serialized = JSON.stringify(list);
      localStorage.setItem(POUCH_KEY, serialized);
      if (localStorage.getItem(POUCH_KEY) !== serialized) throw new Error('Puffy pouch did not round-trip');
      return true;
    } catch (e) {
      reportStorageFailure();
      return false;
    }
  }
  function loadPouch() {
    var raw;
    var parsed;
    try {
      raw = localStorage.getItem(POUCH_KEY);
      parsed = raw === null ? [] : JSON.parse(raw);
    } catch (e) {
      reportRecovery(1);
      parsed = [];
    }
    var normalized = normalizePouch(parsed);
    var saved = normalized.list;
    if (normalized.rejected || raw !== null && raw !== JSON.stringify(saved)) {
      reportRecovery(normalized.rejected);
      writePouch(saved);
    }
    if (!saved.length) {
      saved = DEFAULT_POUCH.map(function (file) { return { file: file, purpose: '' }; });
      writePouch(saved);
    }
    return saved;
  }
  function savePouch(list) {
    var normalized = normalizePouch(list);
    if (normalized.rejected) {
      reportRecovery(normalized.rejected);
      return false;
    }
    return writePouch(normalized.list);
  }
  function stickerByFile(file) {
    return STICKERS.find(function (sticker) { return sticker.file === file; });
  }
  function has(list, id) {
    return list.some(function (p) { return p.id === id; });
  }

  function find(list, id) {
    return list.find(function (p) { return p.id === id; });
  }

  function stickerUrl(file) {
    return '/assets/puffies/' + (stickerByFile(file) ? file : DEFAULT_POUCH[0]);
  }

  function closePicker() {
    if (!activePicker) return;
    activePicker.remove();
    activePicker = null;
  }

  function positionPicker(picker, anchor) {
    var rect = anchor.getBoundingClientRect();
    var width = Math.min(540, window.innerWidth - 24);
    var left = Math.max(12, Math.min(rect.left, window.innerWidth - width - 12));
    var top = rect.bottom + 10;
    if (top + Math.min(560, window.innerHeight * .72) > window.innerHeight) top = 12;
    picker.style.width = width + 'px';
    picker.style.left = left + 'px';
    picker.style.top = top + 'px';
  }

  function openPicker(anchor, el, id, paint) {
    closePicker();
    var picker = document.createElement('div');
    picker.className = 'puffy-picker';
    picker.setAttribute('role', 'dialog');
    picker.setAttribute('aria-label', 'Choose a puffy sticker');
    picker.innerHTML =
      '<div class="puffy-picker-head"><b>Choose from your 10</b><span>Your personal Puffy Sticker pouch. Each one can mean something different to you.</span></div>' +
      '<div class="puffy-picker-grid"></div>' +
      '<div class="puffy-picker-foot"><a href="/laidies-card.html#puffyPouch">Change my 10 in My Closet</a><button type="button" class="puffy-picker-peel">Peel off saved puffy</button></div>';
    var grid = picker.querySelector('.puffy-picker-grid');
    var current = find(load(), id);
    loadPouch().forEach(function (pouchItem) {
      var sticker = stickerByFile(pouchItem.file);
      if (!sticker) return;
      var option = document.createElement('button');
      option.type = 'button';
      option.className = 'puffy-option';
      if (current && current.sticker === sticker.file) option.classList.add('is-current');
      option.setAttribute('aria-label', sticker.label);
      option.innerHTML = '<img src="' + stickerUrl(sticker.file) + '" alt=""><span>' +
        (pouchItem.purpose || sticker.label) + '</span>';
      option.addEventListener('click', function () {
        var list = load().filter(function (p) { return p.id !== id; });
        list.push({
          id: id,
          title: el.getAttribute('data-puffy-title') || (el.textContent || '').trim().slice(0, 80),
          summary: el.getAttribute('data-puffy-summary') || '',
          url: el.getAttribute('data-puffy-url') || location.pathname + '#' + (el.id || id),
          sticker: sticker.file,
          purpose: pouchItem.purpose || '',
          placedAt: new Date().toISOString()
        });
        if (!save(list)) return;
        closePicker();
        paint();
        document.dispatchEvent(new CustomEvent('puffies:changed'));
      });
      grid.appendChild(option);
    });
    var peel = picker.querySelector('.puffy-picker-peel');
    peel.hidden = !current;
    peel.addEventListener('click', function () {
      if (!save(load().filter(function (p) { return p.id !== id; }))) return;
      closePicker();
      paint();
      document.dispatchEvent(new CustomEvent('puffies:changed'));
    });
    document.body.appendChild(picker);
    activePicker = picker;
    positionPicker(picker, anchor);
    picker.querySelector('.puffy-option').focus();
  }

  function makeBtn(el) {
    var id = el.getAttribute('data-puffy-id') || el.id || (el.getAttribute('data-puffy-title') || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    if (!id) return null;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'puffy-btn';
    var kind = el.getAttribute('data-puffy-kind') || 'section';
    btn.innerHTML =
      '<span class="puffy-button-art" aria-hidden="true">' +
        '<img src="/assets/puffies/usable-25-images/75-pink-teal-magic-wand.png" alt="">' +
      '</span><span class="puffy-button-label">Save this ' + kind + ' with a Puffy Sticker</span>';
    function paint() {
      var placedItem = find(load(), id);
      var placed = Boolean(placedItem);
      btn.classList.toggle('is-placed', placed);
      btn.setAttribute('aria-label', placed ? 'Change or remove the puffy sticker saving this section' : 'Choose a puffy sticker to save this section to your Closet');
      btn.title = placed ? 'Saved to your Puffy Board — click to change it' : 'Choose a puffy to save this exact place';
      var art = btn.querySelector('.puffy-button-art');
      var label = btn.querySelector('.puffy-button-label');
      if (placed) {
        art.innerHTML = '<img class="puffy-chosen" src="' + stickerUrl(placedItem.sticker) + '" alt="">';
        label.textContent = 'Saved to My Closet';
      } else {
        art.innerHTML = '<img src="/assets/puffies/usable-25-images/75-pink-teal-magic-wand.png" alt="">';
        label.textContent = 'Save this ' + kind + ' with a Puffy Sticker';
      }
    }
    btn.addEventListener('click', function () {
      openPicker(btn, el, id, paint);
    });
    paint();
    return btn;
  }

  var cssDone = false;
  function wireTarget(el) {
    if (el.getAttribute('data-puffy-wired') === 'true') return;
    var b = makeBtn(el);
    if (!b) return;
    var row = document.createElement('div');
    row.className = 'puffy-save-row';
    row.appendChild(b);
    if (el.classList.contains('term')) el.appendChild(row);
    else el.insertAdjacentElement('afterend', row);
    el.setAttribute('data-puffy-wired', 'true');
  }

  function initReader() {
    var targets = document.querySelectorAll('[data-puffy-title]');
    if (!targets.length) return;
    if (cssDone) {                       // rescan: styles already in, just wire new targets
      targets.forEach(wireTarget);
      return;
    }
    cssDone = true;
    var css = document.createElement('style');
    css.textContent =
      '.puffy-save-row{display:flex;justify-content:flex-end;align-items:center;grid-column:2;margin-top:7px}' +
      '.puffy-btn{display:inline-flex;align-items:center;gap:7px;border:1px solid rgba(36,94,209,.34);background:#fff;' +
      'color:#263654;font:800 9px/1.15 Jost,sans-serif;letter-spacing:.07em;text-transform:uppercase;cursor:pointer;padding:5px 9px 5px 6px;border-radius:999px;}' +
      '.puffy-btn:hover,.puffy-btn:focus-visible{background:#f2f7ff;outline:2px solid rgba(88,217,232,.8);outline-offset:2px;}' +
      '.puffy-button-art{position:relative;display:inline-block;width:28px;height:28px;flex:0 0 28px;}' +
      '.puffy-button-art img{position:absolute;inset:0;width:28px;height:28px;object-fit:contain;filter:drop-shadow(0 2px 2px rgba(10,20,55,.18));}' +
      '.puffy-button-art .puffy-chosen{transform:rotate(-5deg)}' +
      '.puffy-btn.is-placed .puffy-button-label{color:var(--accent,#d62886)}' +
      '.puffy-picker{position:fixed;z-index:10000;background:#f6f2ff;color:#07142f;border:2px solid #1d5fce;border-radius:9px;' +
      'box-shadow:0 20px 55px rgba(4,14,42,.35);padding:14px;max-height:72vh;display:flex;flex-direction:column;}' +
      '.puffy-picker-head{display:flex;flex-direction:column;gap:2px;margin:0 0 10px;padding:0 2px 9px;border-bottom:1px solid #cdd9f4}' +
      '.puffy-picker-head b{font:800 16px/1.15 Jost,sans-serif}.puffy-picker-head span{font:500 11px/1.35 Jost,sans-serif;color:#52617f}' +
      '.puffy-picker-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:7px;padding:2px 2px 4px}' +
      '.puffy-option{display:flex;flex-direction:column;align-items:center;gap:3px;min-height:69px;border:1px solid transparent;border-radius:6px;' +
      'background:#fff;color:#283554;font:700 8px/1.15 Jost,sans-serif;cursor:pointer;padding:4px 2px;text-align:center}' +
      '.puffy-option:hover,.puffy-option:focus-visible{border-color:#18c6d8;background:#eafcff;outline:0}.puffy-option.is-current{border-color:#e84a95;background:#fff0f7}' +
      '.puffy-option img{display:block;width:43px;height:43px;object-fit:contain;filter:drop-shadow(0 3px 3px rgba(10,20,55,.2))}' +
      '.puffy-picker-foot{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:10px;padding-top:9px;border-top:1px solid #cdd9f4;text-align:right}' +
      '.puffy-picker-foot a{color:#245ed1;font:800 9px Jost,sans-serif;letter-spacing:.05em;text-transform:uppercase}' +
      '.puffy-picker-peel{border:0;background:transparent;color:#a02f69;font:800 10px Jost,sans-serif;text-transform:uppercase;letter-spacing:.07em;cursor:pointer;text-decoration:underline}' +
      '@media(max-width:900px){.puffy-save-row{grid-column:1;margin-top:10px;justify-content:flex-start}}' +
      '@media(max-width:560px){.puffy-picker-grid{grid-template-columns:repeat(3,1fr)}.puffy-btn{font-size:8px}}';
    document.head.appendChild(css);
    targets.forEach(wireTarget);
  }

  function initPouch() {
    var pouch = document.getElementById('puffyPouch');
    var editor = document.getElementById('puffyPouchEditor');
    var editButton = document.getElementById('puffyPouchEdit');
    if (!pouch || !editor || !editButton || pouch.getAttribute('data-ready') === 'true') return;
    pouch.setAttribute('data-ready', 'true');

    var css = document.createElement('style');
    css.textContent =
      '.puffy-pouch{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px;margin:16px 0 14px}' +
      '.puffy-pouch-card{display:grid;grid-template-rows:72px auto;gap:7px;min-width:0;padding:8px 7px 9px;border-bottom:2px solid rgba(24,198,216,.35)}' +
      '.puffy-pouch-card img{width:100%;height:72px;object-fit:contain;filter:drop-shadow(0 4px 4px rgba(10,20,55,.18))}' +
      '.puffy-pouch-card input{width:100%;min-width:0;border:0;border-bottom:1px solid rgba(7,20,47,.25);background:transparent;color:#07142f;' +
      'font:700 10px/1.3 Jost,sans-serif;padding:5px 2px}.puffy-pouch-card input:focus{outline:0;border-color:#245ed1}' +
      '.puffy-pouch-actions{display:flex;align-items:center;gap:12px;flex-wrap:wrap}' +
      '.puffy-pouch-actions button,.puffy-pouch-editor-close{border:2px solid #07142f;background:#fff;color:#07142f;border-radius:999px;' +
      'padding:9px 14px;font:800 10px Jost,sans-serif;letter-spacing:.06em;text-transform:uppercase;cursor:pointer}' +
      '.puffy-pouch-actions button:hover,.puffy-pouch-actions button:focus-visible{background:#18c6d8}' +
      '.puffy-pouch-count{font:800 10px Jost,sans-serif;color:#52617f;letter-spacing:.08em;text-transform:uppercase}' +
      '.puffy-pouch-editor{margin-top:15px;padding:16px;border:2px solid #245ed1;background:#eef3ff;border-radius:8px}' +
      '.puffy-pouch-editor[hidden]{display:none}.puffy-pouch-editor-head{display:flex;align-items:center;justify-content:space-between;gap:15px;margin-bottom:12px}' +
      '.puffy-pouch-editor-head b{color:#07142f;font:800 18px Jost,sans-serif}.puffy-pouch-filter{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:12px}' +
      '.puffy-pouch-filter button{border:1px solid #8395be;background:#fff;color:#263654;border-radius:999px;padding:6px 10px;font:800 9px Jost,sans-serif;cursor:pointer}' +
      '.puffy-pouch-filter button.is-active{background:#07142f;color:#fff;border-color:#07142f}' +
      '.puffy-pouch-collection{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:8px;max-height:410px;overflow:auto;padding:3px}' +
      '.puffy-pouch-choice{position:relative;display:flex;flex-direction:column;align-items:center;gap:4px;min-width:0;min-height:94px;border:2px solid transparent;' +
      'background:#fff;color:#263654;border-radius:7px;padding:5px 3px;font:700 8px/1.15 Jost,sans-serif;cursor:pointer;text-align:center}' +
      '.puffy-pouch-choice img{width:58px;height:58px;object-fit:contain}.puffy-pouch-choice.is-selected{border-color:#e84a95;background:#fff1f8}' +
      '.puffy-pouch-choice.is-selected::after{content:"IN MY 10";position:absolute;right:3px;top:3px;background:#07142f;color:#fff;border-radius:3px;padding:2px 3px;font-size:6px;letter-spacing:.05em}' +
      '@media(max-width:700px){.puffy-pouch{grid-template-columns:repeat(2,minmax(0,1fr))}.puffy-pouch-collection{grid-template-columns:repeat(3,minmax(0,1fr));max-height:55vh}}';
    document.head.appendChild(css);

    var activeFilter = 'all';
    function isThing(sticker) {
      var n = Number((sticker.file.match(/\/(\d+)-/) || [])[1] || 0);
      return sticker.file.indexOf('usable-25-images/') === 0 || n <= 6;
    }
    function paintPouch() {
      var selected = loadPouch();
      pouch.innerHTML = '';
      selected.forEach(function (item, index) {
        var sticker = stickerByFile(item.file);
        if (!sticker) return;
        var card = document.createElement('label');
        card.className = 'puffy-pouch-card';
        card.innerHTML = '<img src="' + stickerUrl(item.file) + '" alt="' + sticker.label + '">' +
          '<input type="text" maxlength="34" aria-label="Purpose for ' + sticker.label +
          '" placeholder="e.g. read later" value="">';
        var input = card.querySelector('input');
        input.value = item.purpose || '';
        input.addEventListener('change', function () {
          var next = loadPouch();
          if (next[index]) next[index].purpose = input.value.trim();
          savePouch(next);
          document.dispatchEvent(new CustomEvent('puffies:pouch-changed'));
        });
        pouch.appendChild(card);
      });
      var count = document.getElementById('puffyPouchCount');
      if (count) count.textContent = selected.length + ' of 10 selected';
    }
    function paintCollection() {
      var grid = editor.querySelector('.puffy-pouch-collection');
      var selected = loadPouch();
      grid.innerHTML = '';
      STICKERS.filter(function (sticker) {
        return activeFilter === 'all' || (activeFilter === 'things' ? isThing(sticker) : !isThing(sticker));
      }).forEach(function (sticker) {
        var chosen = selected.some(function (item) { return item.file === sticker.file; });
        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'puffy-pouch-choice' + (chosen ? ' is-selected' : '');
        button.setAttribute('aria-pressed', chosen ? 'true' : 'false');
        button.innerHTML = '<img src="' + stickerUrl(sticker.file) + '" alt=""><span>' + sticker.label + '</span>';
        button.addEventListener('click', function () {
          var next = loadPouch();
          var at = next.findIndex(function (item) { return item.file === sticker.file; });
          if (at >= 0) next.splice(at, 1);
          else if (next.length < 10) next.push({ file: sticker.file, purpose: '' });
          else {
            var count = document.getElementById('puffyPouchCount');
            if (count) count.textContent = '10 selected — remove one before adding another';
            return;
          }
          savePouch(next);
          paintPouch();
          paintCollection();
          document.dispatchEvent(new CustomEvent('puffies:pouch-changed'));
        });
        grid.appendChild(button);
      });
    }

    editor.innerHTML =
      '<div class="puffy-pouch-editor-head"><b>Choose your 10</b><button class="puffy-pouch-editor-close" type="button">Done</button></div>' +
      '<div class="puffy-pouch-filter" role="group" aria-label="Filter Puffy Stickers">' +
        '<button type="button" class="is-active" data-filter="all">All</button>' +
        '<button type="button" data-filter="words">Words & phrases</button>' +
        '<button type="button" data-filter="things">Things & icons</button>' +
      '</div><div class="puffy-pouch-collection"></div>';
    editor.querySelectorAll('[data-filter]').forEach(function (button) {
      button.addEventListener('click', function () {
        activeFilter = button.getAttribute('data-filter');
        editor.querySelectorAll('[data-filter]').forEach(function (item) {
          item.classList.toggle('is-active', item === button);
        });
        paintCollection();
      });
    });
    editButton.addEventListener('click', function () {
      editor.hidden = false;
      paintCollection();
      editor.querySelector('.puffy-pouch-editor-close').focus();
    });
    editor.querySelector('.puffy-pouch-editor-close').addEventListener('click', function () {
      editor.hidden = true;
      editButton.focus();
    });
    paintPouch();
  }

  // Closet board — renders wherever #puffyBoard exists
  function initBoard() {
    var board = document.getElementById('puffyBoard');
    if (!board) return;
    function paint() {
      var list = load();
      board.innerHTML = '';
      if (!list.length) {
        board.innerHTML = '<p class="puffy-empty">No puffies placed yet. Put a puffy on any book or section at the <a href="/library.html">LIBR<span class="ai">Ai</span>RY</a> and it lands here.</p>';
        return;
      }
      list.sort(function (a, b) { return (b.placedAt || '').localeCompare(a.placedAt || ''); });
      list.forEach(function (p) {
        var currentPouchItem = loadPouch().find(function (item) { return item.file === p.sticker; });
        var purpose = currentPouchItem ? currentPouchItem.purpose : (p.purpose || '');
        var item = document.createElement('div');
        item.className = 'puffy-item';
        item.innerHTML = '<a class="puffy-item-main"><span class="puffy-item-clip" aria-hidden="true"></span>' +
          '<span class="puffy-item-body"><b></b><small></small></span></a>' +
          '<button type="button" class="puffy-peel" aria-label="Peel this puffy off the board">&times;</button>';
        item.querySelector('.puffy-item-main').href = p.url;
        item.querySelector('b').textContent = p.title;
        item.querySelector('small').textContent =
          (purpose ? purpose + ' · ' : '') + (p.summary || 'Saved from the LIBRAiRY');
        item.querySelector('.puffy-item-clip').style.backgroundImage = 'url("' + stickerUrl(p.sticker) + '")';
        item.querySelector('.puffy-item-clip').style.backgroundSize = 'contain';
        item.querySelector('.puffy-item-clip').style.backgroundPosition = 'center';
        item.querySelector('.puffy-item-clip').style.backgroundRepeat = 'no-repeat';
        item.querySelector('.puffy-peel').addEventListener('click', function () {
          if (!save(load().filter(function (q) { return q.id !== p.id; }))) return;
          paint();
        });
        board.appendChild(item);
      });
    }
    paint();
    document.addEventListener('puffies:changed', paint);
  }

  function init() { initReader(); initPouch(); initBoard(); }
  // Public rescan — for pages that reveal savable sections after load
  // (the LIBRAiRY opens books in place, so their sections arrive late).
  window.svPuffyScan = function () { initReader(); initPouch(); initBoard(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  document.addEventListener('click', function (ev) {
    if (!activePicker) return;
    if (activePicker.contains(ev.target) || ev.target.closest('.puffy-btn')) return;
    closePicker();
  });
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') closePicker();
  });
  window.addEventListener('resize', closePicker);
})();
