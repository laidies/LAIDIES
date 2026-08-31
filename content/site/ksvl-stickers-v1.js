(function (global) {
  'use strict';
  var KEY = 'laidies_ksvl_sticker_picks_v1';
  var rows = [
    ['ksvl-community-raidio', 'KSVL · Community RAiDIO'],
    ['ksvl-charter-listener', 'Charter Listener', true],
    ['ksvl-all-wednesdays', 'All Wednesdays', true],
    ['ksvl-dj-sunnyv-fanclub', 'DJ SunnyV Fan Club'],
    ['ksvl-saints-mix-certified', 'SAiNTS Mix Certified', true],
    ['ksvl-bronze-aige-regular', 'BRONZE AiGE Regular', true],
    ['ksvl-mix-cd-alchemist', 'Mix CD Alchemist', true],
    ['ksvl-encore', 'Encore', true],
    ['ksvl-books-hooks-motto-oval', '“Don’t just learn from books”'],
    ['ksvl-dont-just-learn-bumper', 'Books & Hooks · Bumper'],
    ['band-the-laidies', 'THE LAiDIES'], ['band-the-regressions', 'The Regressions'],
    ['band-the-recalls', 'The Recalls'], ['band-the-overfits', 'The Overfits'],
    ['band-the-embeddings', 'The Embeddings'], ['band-latent-space', 'Latent Space'],
    ['band-the-bots', 'The Bots'], ['band-chain-of-thought', 'Chain of Thought'],
    ['band-grand-ol-query', 'Grand Ol’ Query'], ['band-the-predicts', 'The Predicts']
  ];
  var declarations = rows.filter(function (r) { return !r[2]; }).map(function (r) { return r[0]; });
  var selected = [];
  var lastSaved = '';
  var message = '';
  var saving = false;
  function privateRoute() {
    return !(/(?:^|[?&])(?:u|member)(?:=|&|$)/.test(global.location.search));
  }
  function clean(value) {
    if (!value || !Array.isArray(value.slugs) || typeof value.picked !== 'boolean') return null;
    return {picked: value.picked, slugs: Array.from(new Set(value.slugs.filter(function (s) {
      return declarations.indexOf(s) !== -1;
    }))).slice(0, 3).sort()};
  }
  function read() {
    var raw = global.localStorage.getItem(KEY);
    if (raw !== null) return clean(JSON.parse(raw)) || {picked:false,slugs:[]};
    // Preserve bounded original declarations, never infer listening achievements.
    var legacy = JSON.parse(global.localStorage.getItem('laidies_ksvl_stickers_earned') || '[]');
    var oldPicked = global.localStorage.getItem('laidies_ksvl_stickers_picked') === '1';
    var migrated = clean({picked:oldPicked, slugs:Array.isArray(legacy) ? legacy : []});
    if (migrated.slugs.length || oldPicked) {
      migrated.picked = true;
      write(migrated);
    }
    return migrated;
  }
  function write(value) {
    var valid = clean(value);
    if (!valid) throw new Error('Invalid sticker choices');
    var serialized = JSON.stringify(valid);
    global.localStorage.setItem(KEY, serialized);
    if (global.localStorage.getItem(KEY) !== serialized) throw new Error('Sticker storage denied');
    return valid;
  }
  function node(tag, className, text) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
  }
  function picture(row) {
    var img = node('img');
    img.src = '/assets/stickers/ksvl/' + row[0] + '.png';
    img.alt = row[1];
    img.loading = 'lazy';
    return img;
  }
  async function save(value) {
    if (saving || !privateRoute()) return;
    saving = true;
    message = '';
    try {
      write(value);
      selected = [];
      message = 'Saved on this device. Open your Closet to see your picks.';
      render();
      var continuation = global.LAIDIESResidentContinuationV1;
      if (!continuation) {
        message = 'Saved on this device. Account sync is unavailable; your picks have not been confirmed on another device.';
      } else {
        continuation.collectLocal();
        if (global.LAIDIESResidentAccountRuntime) {
          var runtime = await global.LAIDIESResidentAccountRuntime.get();
          var session = await runtime.controller.getSession();
          if (session) {
            await continuation.syncWith(runtime);
            var currentSession = await runtime.controller.getSession();
            if (!currentSession || currentSession.user.id !== session.user.id ||
                JSON.stringify(read()) !== JSON.stringify(clean(value))) throw new Error('Sticker save changed accounts or choices');
            message = 'Saved to your account and your private Closet.';
          } else message = 'Saved on this device. Sign in at the Resident desk to keep your picks across devices.';
        }
      }
    } catch (_) {
      message = 'Could not confirm this save. Your account has not been confirmed up to date; check your picks here before leaving.';
    } finally { saving = false; render(); }
  }
  function render() {
    if (!privateRoute()) return;
    var state;
    try { state = read(); } catch (_) {
      state = {picked:false,slugs:[]};
      message = 'This browser cannot read or save sticker choices. Nothing is confirmed saved.';
    }
    var snapshot = JSON.stringify(state);
    if (lastSaved && lastSaved !== snapshot) selected = [];
    lastSaved = snapshot;
    var grid = document.getElementById('ksvl-stickers-grid');
    if (grid) {
      grid.replaceChildren();
      rows.forEach(function (row) {
        var picked = state.slugs.indexOf(row[0]) !== -1;
        var choose = !row[2] && !state.picked;
        var tile = node(choose ? 'button' : 'div', 'ksvl-sticker-tile' + (picked ? ' is-earned' : ' is-locked'));
        tile.dataset.slug = row[0];
        if (choose) {
          tile.type = 'button';
          tile.classList.add('is-selectable');
          tile.setAttribute('aria-label', row[1]);
          tile.setAttribute('aria-pressed', String(selected.indexOf(row[0]) !== -1));
          if (selected.indexOf(row[0]) !== -1) tile.classList.add('is-selected');
          tile.addEventListener('click', function () {
            if (selected.indexOf(row[0]) !== -1) selected = selected.filter(function (s) { return s !== row[0]; });
            else if (selected.length < 3) selected.push(row[0]);
            else message = 'Choose up to three. Unselect one to choose another.';
            render();
          });
        }
        tile.appendChild(picture(row));
        var caption = node('div', 'ksvl-sticker-caption');
        caption.appendChild(node('strong', '', row[1]));
        caption.appendChild(node('span', 'earn-hint', row[2] ? 'Listening achievement · coming later' : picked ? 'Picked for your Closet' : state.picked ? 'Counter pickup already used' : 'Pick from the counter'));
        tile.appendChild(caption);
        grid.appendChild(tile);
      });
      var status = document.getElementById('ksvl-stickers-status');
      status.replaceChildren(node('span', '', message || (state.picked ? state.slugs.length + ' picks in your private Closet.' : 'Pick up to three declaration stickers. These are taste picks, not listening rewards.')));
      status.setAttribute('role','status');
      if (!state.picked && selected.length) {
        var confirm = node('button','ksvl-stickers-confirm-btn','Take these ' + selected.length + ' →');
        confirm.id = 'ksvl-stickers-confirm'; confirm.type = 'button'; confirm.disabled = saving;
        confirm.addEventListener('click',function () { save({picked:true,slugs:selected.slice()}); });
        status.appendChild(confirm);
      }
      if (state.picked) {
        var link = node('a','','Open your Closet →'); link.href = '/laidies-card#ksvlClosetStickers'; status.appendChild(link);
      }
    }
    var closet = document.getElementById('ksvlClosetStickers');
    if (closet) {
      closet.hidden = false;
      var shelf = document.getElementById('ksvlClosetStickerGrid');
      shelf.replaceChildren();
      state.slugs.forEach(function (slug) {
        var row = rows.find(function (r) { return r[0] === slug; });
        var tile = node('div','ksvl-closet-sticker');
        tile.appendChild(picture(row));
        var remove = node('button','','Remove ' + row[1]); remove.type = 'button'; remove.disabled = saving;
        remove.addEventListener('click',function () { save({picked:true,slugs:state.slugs.filter(function (s) { return s !== slug; })}); });
        tile.appendChild(remove); shelf.appendChild(tile);
      });
      document.getElementById('ksvlClosetStickerStatus').textContent = message || (state.slugs.length ? state.slugs.length + ' declaration picks. These are not earned rewards.' : state.picked ? 'No remaining picks. Your one-time counter pickup has been used.' : 'No Radio picks yet. Choose up to three at the KSVL counter.');
    }
  }
  global.KSVL_stickers = {
    list:function () { return rows.map(function(r){return {slug:r[0],name:r[1],type:r[2]?'achievement':'declaration'};}); },
    earned:function () { try {return read().slugs;}catch(_){return [];} },
    // Historical unverified earn calls cannot create listening achievements.
    earn:function () { return false; },
    read:read, render:render
  };
  global.addEventListener('laidies:continuation-change',function () {message='';render();});
  global.addEventListener('storage',function(e){if(e.key===KEY || e.key===null){message='';render();}});
  render();
})(window);
