/** Shared placement for existing navigation, tour, map and radio controls.
 * Moves the original nodes so listeners, focus and service state survive.
 * Both the shared header and specialist headers retain their own contents.
 */
(function () {
  'use strict';
  if (window.svHeaderControls) return;
  var HEADER = '.sv-controls-header,.sv-header,.site-header,header.topbar,.back-bar,.issue-site-nav,.preview-ribbon,.sticky-back,.back-nav,.site-nav';
  var CONTROL = '.sv-side-rail,.sv-yah-chip,.svwt-chip,.svwt-offer,.svwt-paused,.ksvl-now-playing,#ksvl-resume-nudge,.wednesday-return,[data-laidies-context-return]';
  var MENU = '#svghPanel,#mobile-nav,#laidiesUnifiedMenu';
  var host;
  var watchedHeaders = new WeakSet();
  var queued = false;
  var style = document.createElement('style');
  style.id = 'sv-header-controls-style';
  style.textContent = `
    body:has(> .sv-controls-header) { grid-template-rows:auto 1fr; }
    .sv-controls-header { box-sizing:border-box; width:100%; align-self:start; display:flex; align-items:center; justify-content:space-between; gap:12px; padding:0 0 12px; color:#4b2148; font-family:Jost,sans-serif; border-bottom:1px solid currentColor; }
    .sv-controls-header .sv-control-home { font:800 20px/1 Jost,sans-serif; text-decoration:none; color:inherit; background:transparent; border:0; border-radius:0; padding:0; min-height:44px; display:inline-flex; align-items:center; }
    .sv-controls-header .sv-header-utilities { flex:1 1 200px; width:auto; justify-content:flex-end; }
    body[data-ksvl-popup] .sv-controls-header { color:#fffdfb; }
    body[data-ksvl-popup] .sv-header-utilities .sv-rail-item { color:#fffdfb!important; }
    .sv-has-header-controls { flex-wrap:wrap!important; height:auto!important; max-height:none!important; }
    .sv-has-header-controls > .site-header-inner { width:100%; min-width:0; }
    .sv-header-utilities { box-sizing:border-box; display:flex; flex:1 1 100%; grid-column:1 / -1!important; width:100%; min-width:0; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px 14px; }
    .sv-header-utilities [hidden] { display:none!important; }
    .sv-header-utilities[hidden] { display:none!important; }
    .sv-header-utilities :is(.sv-side-rail,.sv-yah-chip,.svwt-chip,.svwt-offer,.svwt-paused,.ksvl-now-playing,#ksvl-resume-nudge,.wednesday-return,[data-laidies-context-return]) { position:static!important; inset:auto!important; transform:none!important; float:none!important; margin:0!important; box-sizing:border-box; max-width:100%!important; z-index:auto!important; }
    .sv-header-utilities .sv-side-rail { display:flex; flex-direction:row; flex-wrap:wrap; width:auto; padding:0; gap:8px; }
    body.sv-has-rail,body.sv-has-rail:has(.sv-rail-item:hover),body.sv-has-rail:has(.sv-rail-item:focus-visible) { padding-right:0; }
    .sv-header-utilities .sv-rail-item { min-height:44px; min-width:44px; max-width:100%; padding:8px 13px; gap:7px; border:1.5px solid currentColor; border-radius:999px; background:transparent; color:#4b2148!important; box-shadow:none; backdrop-filter:none; justify-content:flex-start; transition:none; }
    .sv-header-utilities .sv-rail-item__icon { width:auto; height:auto; color:inherit; }
    .sv-header-utilities .sv-rail-item__label { opacity:1; max-width:none; white-space:normal; margin:0; font:700 12px/1.3 Jost,sans-serif; letter-spacing:.02em; text-transform:none; color:inherit!important; }
    .sv-header-utilities .sv-rail-item:hover { background:rgba(75,33,72,.08); }
    .sv-header-utilities .sv-rail-item:focus-visible { outline:3px solid #7137d6; outline-offset:3px; }
    .sv-header-tour { flex:1 1 100%; min-width:0; }
    .sv-header-tour > summary { display:list-item; box-sizing:border-box; width:max-content; max-width:100%; min-height:44px; padding:12px 16px; border:1.5px solid currentColor; border-radius:999px; color:#4b2148; font:700 12px/1.4 Jost,sans-serif; cursor:pointer; }
    .sv-header-tour[open] > summary { margin-bottom:8px; }
    .sv-header-utilities .sv-yah-chip { min-height:44px; box-shadow:none; }
    .sv-header-utilities :is(.svwt-chip,.svwt-offer,.svwt-paused) { width:100%; box-shadow:none; padding:10px 14px; }
    .sv-header-utilities .svwt-chip { display:grid; grid-template-columns:minmax(0,1fr) auto; gap:6px 16px; align-items:center; }
    .sv-header-utilities .svwt-chip > :is(.svwt-eyebrow,.svwt-progress) { grid-column:1 / -1; margin:0; }
    .sv-header-utilities .svwt-chip > :is(.svwt-name,.svwt-line) { margin:0; }
    .sv-header-utilities .svwt-line { grid-column:1; }
    .sv-header-utilities .svwt-next { grid-column:2; grid-row:2 / 4; box-shadow:none; }
    .sv-header-utilities .ksvl-now-playing { width:100%; flex:1 1 100%; box-shadow:none; }
    .ksvl-player-space { display:none!important; }
    .sv-header-utilities #ksvl-resume-nudge { width:100%; white-space:normal; animation:none; box-shadow:none; }
    .sv-header-utilities :is(button,a,input[type=range]),.svgh-menu-btn,.svgh-nav > a { min-height:44px; min-width:44px; box-sizing:border-box; }
    .sv-header-utilities [data-laidies-context-return] { min-height:44px!important; }
    .sv-has-header-controls :is(#svghPanel,#mobile-nav,#laidiesUnifiedMenu) { position:absolute!important; top:100%!important; bottom:auto!important; max-height:calc(100dvh - var(--sv-controls-header-height, 80px) - 12px)!important; overflow-y:auto; }
    @media(max-width:760px) {
      .sv-has-header-controls .svgh-left { flex:1 1 auto; }
      .sv-has-header-controls .svgh-nav { flex-wrap:wrap; gap:6px; justify-content:flex-end; }
      .sv-header-utilities .ksvl-np-controls { min-width:0; }
      .sv-header-utilities .svwt-chip { display:block; }
      .sv-header-utilities .svwt-chip > * + * { margin-top:8px; }
    }
    @media print { .sv-header-utilities { display:none!important; } }
  `;
  document.head.appendChild(style);

  function headerHost() {
    var header = document.querySelector(HEADER);
    if (!header) {
      header = document.createElement('header');
      header.className = 'sv-controls-header';
      header.setAttribute('aria-label', 'Site controls');
      var home = document.createElement('a');
      home.className = 'sv-control-home';
      home.href = '/';
      home.textContent = 'LAiDIES';
      home.setAttribute('aria-label', 'LAiDIES home');
      header.appendChild(home);
      document.body.prepend(header);
    }
    header.classList.add('sv-has-header-controls');
    host = header.querySelector('.sv-header-utilities');
    if (!host) {
      host = document.createElement('div');
      host.className = 'sv-header-utilities';
      host.setAttribute('role', 'group');
      host.setAttribute('aria-label', 'Page and listening controls');
      header.appendChild(host);
    }
    ['svghPanel', 'mobile-nav', 'laidiesUnifiedMenu'].forEach(function (id) {
      var menu = document.getElementById(id);
      if (menu && menu.parentElement !== header) header.appendChild(menu);
    });
    if (!watchedHeaders.has(header) && typeof ResizeObserver === 'function') {
      watchedHeaders.add(header);
      new ResizeObserver(function () {
        header.style.setProperty('--sv-controls-header-height', header.getBoundingClientRect().height + 'px');
      }).observe(header);
    }
    return host;
  }

  function place() {
    queued = false;
    if (!document.body) return;
    var nodes = Array.from(document.querySelectorAll(CONTROL));
    if (!nodes.length && !(document.querySelector(HEADER) && document.querySelector(MENU))) return;
    var dest = headerHost();
    function rank(node) {
      if (node.matches('.sv-side-rail,[data-laidies-context-return],.wednesday-return')) return 0;
      if (node.matches('.sv-yah-chip')) return 1;
      if (node.matches('.svwt-chip,.svwt-offer,.svwt-paused')) return 2;
      if (node.matches('.ksvl-now-playing')) return 3;
      return 4;
    }
    nodes.sort(function (a, b) { return rank(a) - rank(b); });
    var tour = dest.querySelector('.sv-header-tour');
    var tourNodes = nodes.filter(function (node) { return rank(node) === 2; });
    if (tourNodes.length && !tour) {
      tour = document.createElement('details');
      tour.className = 'sv-header-tour';
      var summary = document.createElement('summary');
      summary.textContent = 'Welcome Tour';
      tour.appendChild(summary);
      dest.appendChild(tour);
    }
    if (!tourNodes.length && tour) { tour.remove(); tour = null; }
    if (tour) tour.hidden = !tourNodes.some(function (node) { return !node.hidden && getComputedStyle(node).display !== 'none'; });
    var ordered = [];
    nodes.forEach(function (node) {
      var parent = rank(node) === 2 ? tour : dest;
      if (node.parentElement !== parent) parent.appendChild(node);
      var item = rank(node) === 2 ? tour : node;
      if (ordered.indexOf(item) === -1) ordered.push(item);
    });
    ordered.forEach(function (node, i) {
      if (dest.children[i] !== node) dest.insertBefore(node, dest.children[i] || null);
    });
    // Keep explicit legacy return context rather than presenting two Back links.
    var contextual = dest.querySelector('[data-laidies-context-return],.wednesday-return');
    var railBack = dest.querySelector('.sv-rail-item--back');
    if (railBack) railBack.hidden = Boolean(contextual);
    document.body.classList.remove('sv-has-rail');
    dest.hidden = !nodes.some(function (node) {
      return !node.hidden && getComputedStyle(node).display !== 'none';
    });
  }

  function schedule() {
    if (queued) return;
    queued = true;
    queueMicrotask(place);
  }
  window.svHeaderControls = { refresh: schedule };
  function start() {
    place();
    new MutationObserver(function (records) {
      var relevant = records.some(function (record) {
        if (record.type === 'attributes') return record.target.matches(CONTROL);
        return Array.from(record.addedNodes).some(function (node) {
          return node.nodeType === 1 && (node.matches(CONTROL + ',' + HEADER + ',' + MENU) || node.querySelector(CONTROL + ',' + MENU));
        }) || Array.from(record.removedNodes).some(function (node) {
          return node.nodeType === 1 && node.matches(CONTROL);
        });
      });
      if (relevant) schedule();
    }).observe(document.body, { childList:true, subtree:true, attributes:true, attributeFilter:['class','hidden'] });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();
