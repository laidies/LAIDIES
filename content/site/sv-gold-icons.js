/**
 * SUNNYVAiLE gold icon kit — the site's shared UI iconography.
 *
 * Hand-drawn SVG line icons on a 24×24 grid, ~1.6px stroke, round caps,
 * metallic gold gradient. NO EMOJI in interface chrome (Ali, 2026-07-05) —
 * every rail pill, menu row, hub button, and chip icon comes from here so
 * the whole site speaks one engraved-gold icon language.
 *
 * Usage:  window.svGoldIcon('book', 'someUniqueId', 22)  → svg markup
 * Include BEFORE any consumer (defer order): sv-global-header.js,
 * quick-rail.js, sv-welcome-tour.js all read window.SV_GOLD_ICONS.
 */
(function () {
  'use strict';

  // GRAD is swapped for a per-instance gradient id at render time —
  // SVG gradient ids must be document-unique.
  var ICONS = {
    // ---- places & wayfinding -------------------------------------------
    map: '<path d="M3.5 6.5 L9 4.5 L15 6.5 L20.5 4.5 V17.5 L15 19.5 L9 17.5 L3.5 19.5 Z"/><path d="M9 4.5 V17.5 M15 6.5 V19.5"/><circle cx="12" cy="11" r="1.4" fill="url(#GRAD)" stroke="none"/>',
    home: '<path d="M3.5 11.5 L12 4.5 L20.5 11.5"/><path d="M6 9.8 V19.5 H18 V9.8"/><path d="M10 19.5 V14 H14 V19.5"/>',
    columns: '<path d="M4 9 L12 4.5 L20 9 H4 Z"/><path d="M6.2 11 V16 M10.1 11 V16 M13.9 11 V16 M17.8 11 V16"/><path d="M4.5 17.8 H19.5 M3.5 19.5 H20.5 M4.5 9 V11 H19.5 V9"/>',
    bus: '<path d="M4 6 C4 4.9 4.9 4.5 6 4.5 H18 C19.1 4.5 20 4.9 20 6 V16.5 H4 Z"/><path d="M4 9.8 H20 M12 4.5 V9.8"/><circle cx="7.5" cy="18.4" r="1.5"/><circle cx="16.5" cy="18.4" r="1.5"/><path d="M6.5 13.2 H8.5"/>',
    // ---- reading & reference -------------------------------------------
    book: '<path d="M12 6.2 C10.2 4.8 7.2 4.4 4.2 5 V18.6 C7.2 18 10.2 18.4 12 19.8 C13.8 18.4 16.8 18 19.8 18.6 V5 C16.8 4.4 13.8 4.8 12 6.2 Z"/><path d="M12 6.2 V19.8"/><path d="M6.8 9.2 C8.1 9 9.4 9.2 10.3 9.6 M6.8 12.2 C8.1 12 9.4 12.2 10.3 12.6 M17.2 9.2 C15.9 9 14.6 9.2 13.7 9.6 M17.2 12.2 C15.9 12 14.6 12.2 13.7 12.6"/>',
    news: '<path d="M4 5.5 H16.5 V18.5 H5.5 C4.7 18.5 4 17.8 4 17 Z"/><path d="M16.5 8.5 H20 V17 C20 17.8 19.3 18.5 18.5 18.5 H16.5"/><path d="M6.5 8.5 H14 M6.5 11.5 H14 M6.5 14.5 H10.5"/>',
    gradcap: '<path d="M12 4.8 L21 8.8 L12 12.8 L3 8.8 Z"/><path d="M7.4 10.8 V14.6 C7.4 16.6 16.6 16.6 16.6 14.6 V10.8"/><path d="M21 8.8 V13.2"/><circle cx="21" cy="14.2" r="0.9" fill="url(#GRAD)" stroke="none"/>',
    // ---- magic & fortune -----------------------------------------------
    wand: '<path d="M4.5 19.5 L13.5 10.5"/><path d="M16.8 3.5 L17.6 6.2 L20.3 7 L17.6 7.8 L16.8 10.5 L16 7.8 L13.3 7 L16 6.2 Z" fill="url(#GRAD)" stroke="none"/><path d="M11 5.5 L11.3 6.7 M20 12.5 L20.3 13.7"/>',
    crystal: '<circle cx="12" cy="10" r="5.6"/><path d="M8 16.6 L6.8 19.5 H17.2 L16 16.6"/><path d="M9.4 8 C10 7 11 6.4 12.1 6.4"/>',
    candle: '<path d="M12 3.2 C13.5 5.1 14.2 6.3 12 8 C9.8 6.3 10.5 5.1 12 3.2 Z" fill="url(#GRAD)" stroke="none"/><path d="M12 8.4 V10.4"/><path d="M9 10.6 H15 V19.5 H9 Z"/><path d="M7 19.5 H17"/>',
    // ---- food & shops ---------------------------------------------------
    cup: '<path d="M7 8.5 L8.3 20 H15.7 L17 8.5"/><path d="M6.3 8.5 H17.7 M7.5 5.8 H16.5 V8.5 H7.5 Z"/><path d="M12.8 5.8 L14.6 2.5"/>',
    bag: '<path d="M6.3 8.7 H17.7 L18.7 19.5 H5.3 Z"/><path d="M9.4 11 V7 C9.4 3.9 14.6 3.9 14.6 7 V11"/>',
    martini: '<path d="M5 5 H19 L13.2 11.8 V17.8"/><path d="M10.8 17.8 H15.6 M13.2 17.8 V17.8"/><path d="M9 19.5 H17.4"/><circle cx="14.8" cy="7.3" r="1.3"/><path d="M14.8 6 L16.6 3.6"/>',
    lipstick: '<path d="M9.2 13 H14.8 V19.5 H9.2 Z"/><path d="M10.6 13 V10.6 H13.4 V13"/><path d="M10.6 10.6 V7.2 C10.6 5.4 12.4 4.4 13.4 6 V10.6"/>',
    dress: '<path d="M9.3 4.5 C9.3 6.2 10.4 7.2 12 7.2 C13.6 7.2 14.7 6.2 14.7 4.5"/><path d="M10.2 7 L9.2 10.6 C7.5 13.9 6.9 16.9 7.3 19.5 H16.7 C17.1 16.9 16.5 13.9 14.8 10.6 L13.8 7"/><path d="M9.2 10.6 H14.8"/>',
    // ---- media & play ---------------------------------------------------
    vhs: '<path d="M3.5 6.5 H20.5 V17.5 H3.5 Z"/><circle cx="8.3" cy="12" r="2"/><circle cx="15.7" cy="12" r="2"/><path d="M10.3 12 H13.7"/>',
    joystick: '<path d="M5 16 H19 V19.5 H5 Z"/><path d="M10.5 16 V10"/><circle cx="10.5" cy="7.5" r="2.4"/><circle cx="15.5" cy="13.8" r="1.1" fill="url(#GRAD)" stroke="none"/>',
    radio: '<path d="M4 9.5 H20 V19 H4 Z"/><path d="M16.5 9.5 L20 3.8"/><circle cx="9" cy="14.2" r="2.5"/><path d="M14.5 12.5 H17.5 M14.5 16 H17.5"/>',
    cd: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2.2"/><path d="M6.6 8.6 C7.4 7.3 8.7 6.3 10.2 5.9"/>',
    guitar: '<path d="M17.9 6.1 L20.4 3.6 M18.6 3 L21 5.4"/><path d="M11.7 12.3 L18.2 5.8"/><path d="M11.4 11.9 C13.1 12.4 13.7 14 12.9 15.4 C14.3 17.3 13.2 19.8 10.9 20.2 C8.4 20.7 6.2 18.9 6.4 16.6 C6.5 14.9 7.8 13.9 9.4 13.8 C9.8 12.9 10.5 12.1 11.4 11.9 Z"/><circle cx="10" cy="16.4" r="1.2"/>',
    star: '<path d="M12 3.8 L14.1 8.9 L19.7 9.3 L15.4 12.9 L16.8 18.4 L12 15.4 L7.2 18.4 L8.6 12.9 L4.3 9.3 L9.9 8.9 Z"/>',
    tent: '<path d="M12 5.2 L3.5 19.5 H20.5 Z"/><path d="M12 5.2 L9.4 19.5 M12 5.2 L14.6 19.5"/><path d="M12 5.2 V2.8 L14.6 3.6 L12 4.5"/>',
    backpack: '<path d="M6.5 9.5 C6.5 6.3 8.6 4.8 12 4.8 C15.4 4.8 17.5 6.3 17.5 9.5 V19.5 H6.5 Z"/><path d="M10 4.8 C10 3.4 14 3.4 14 4.8"/><path d="M9 13.5 H15 V17 H9 Z M12 13.5 V15"/>',
    flower: '<circle cx="12" cy="12" r="1.9" fill="url(#GRAD)" stroke="none"/><path d="M12 9.6 C10.4 8.6 10.4 5.4 12 4.2 C13.6 5.4 13.6 8.6 12 9.6 Z"/><path d="M14.1 13.2 C15.1 11.6 18.3 11.6 19.5 13.2 C18.3 14.8 15.1 14.8 14.1 13.2 Z" transform="rotate(-72 12 12)"/><path d="M14.1 13.2 C15.1 11.6 18.3 11.6 19.5 13.2 C18.3 14.8 15.1 14.8 14.1 13.2 Z" transform="rotate(-144 12 12)"/><path d="M14.1 13.2 C15.1 11.6 18.3 11.6 19.5 13.2 C18.3 14.8 15.1 14.8 14.1 13.2 Z" transform="rotate(-216 12 12)"/><path d="M14.1 13.2 C15.1 11.6 18.3 11.6 19.5 13.2 C18.3 14.8 15.1 14.8 14.1 13.2 Z" transform="rotate(-288 12 12)"/>',
    // ---- people & post ---------------------------------------------------
    chat: '<path d="M4 5.5 H20 V15.5 H10.5 L6.5 19.5 V15.5 H4 Z"/><path d="M12 12.6 C10.9 11.5 9.5 10.3 10.6 9 C11.3 8.2 12 8.9 12 9.5 C12 8.9 12.7 8.2 13.4 9 C14.5 10.3 13.1 11.5 12 12.6 Z" fill="url(#GRAD)" stroke="none"/>',
    mail: '<path d="M3.5 6 H20.5 V18 H3.5 Z"/><path d="M3.5 6.8 L12 13 L20.5 6.8"/>',
    heartmail: '<path d="M3.5 6 H20.5 V18 H3.5 Z"/><path d="M3.5 6.8 L12 13 L20.5 6.8"/><path d="M12 17.2 C11 16.2 9.8 15.2 10.7 14 C11.3 13.3 12 13.9 12 14.4 C12 13.9 12.7 13.3 13.3 14 C14.2 15.2 13 16.2 12 17.2 Z" fill="url(#GRAD)" stroke="none"/>',
    phone: '<path d="M4.6 9 C4.6 6.4 7.2 4.8 12 4.8 C16.8 4.8 19.4 6.4 19.4 9 L18.5 11 C18.2 11.7 17.4 12 16.7 11.7 L15 11 C14.4 10.7 14 10.1 14.1 9.4 L14.2 8.4 C12.8 8.1 11.2 8.1 9.8 8.4 L9.9 9.4 C10 10.1 9.6 10.7 9 11 L7.3 11.7 C6.6 12 5.8 11.7 5.5 11 Z"/><path d="M9.5 15 H14.5 M8 18.2 H16"/>'
  };

  var GOLD_STOPS = '<stop offset="0" stop-color="#9a6d10"/><stop offset="0.45" stop-color="#f3d879"/><stop offset="0.55" stop-color="#ffeb9e"/><stop offset="1" stop-color="#a87b1c"/>';
  var uidSeq = 0;

  function svGoldIcon(key, uid, size) {
    if (!ICONS[key]) return '';
    var gid = 'svgi-' + (uid != null ? String(uid).replace(/[^\w-]/g, '') : 'a' + (uidSeq++));
    var px = size || 22;
    return '<svg viewBox="0 0 24 24" width="' + px + '" height="' + px + '" fill="none" stroke="url(#' + gid + ')"'
      + ' stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
      + '<defs><linearGradient id="' + gid + '" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">'
      + GOLD_STOPS + '</linearGradient></defs>'
      + ICONS[key].split('GRAD').join(gid) + '</svg>';
  }

  window.SV_GOLD_ICONS = ICONS;
  window.svGoldIcon = svGoldIcon;
})();
